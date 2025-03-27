import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { ArrowUpIcon, PaperClipIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { BeatLoader } from 'react-spinners';

// Configure marked
marked.setOptions({
  highlight: (code, lang) => hljs.highlightAuto(code).value,
  langPrefix: 'hljs language-'
});

function Ai() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('document');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Load chat history
  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChatHistory(chats);
    });
    return () => unsubscribe();
  }, []);

  const createNewChat = () => {
    setCurrentChatId(Date.now().toString());
    setMessages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    
    try {
      setIsLoading(true);
      
      // Call RAG API
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
      });
      
      const data = await response.json();
      
      // Add assistant message
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.response, sources: data.sources }
      ]);
      
      // Save to Firebase
      await saveMessagesToFirebase([
        { role: 'user', content: input },
        { role: 'assistant', content: data.response, sources: data.sources }
      ]);
      
    } catch (error) {
      setMessages(prev => [...prev, { role: 'error', content: error.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target.result.split(',')[1];
      
      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: selectedFile.name,
            file_type: fileType,
            file_data: base64Data
          })
        });

        const data = await response.json();
        if (response.ok) {
          setMessages(prev => [...prev, 
            { role: 'system', content: `Document "${selectedFile.name}" uploaded` }
          ]);
          await saveMessagesToFirebase([
            { role: 'system', content: `Document "${selectedFile.name}" uploaded` }
          ]);
        }
      } catch (error) {
        setMessages(prev => [...prev, { role: 'error', content: error.message }]);
      }
    };
    
    reader.readAsDataURL(selectedFile);
    setShowUpload(false);
    setSelectedFile(null);
  };

  const saveMessagesToFirebase = async (newMessages) => {
    if (!currentChatId) return;

    const chatRef = doc(db, 'chats', currentChatId);
    await setDoc(chatRef, {
      title: newMessages.find(m => m.role === 'user')?.content?.substring(0, 30) || 'New Chat',
      timestamp: serverTimestamp()
    }, { merge: true });

    const messagesRef = collection(db, 'chats', currentChatId, 'messages');
    for (const message of newMessages) {
      await setDoc(doc(messagesRef), {
        ...message,
        timestamp: serverTimestamp()
      });
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={createNewChat}
            className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md"
          >
            New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chatHistory.map(chat => (
            <div
              key={chat.id}
              className="p-2 hover:bg-gray-700 rounded-md cursor-pointer"
              onClick={() => setCurrentChatId(chat.id)}
            >
              <div className="truncate">{chat.title}</div>
              <div className="text-xs text-gray-400">
                {new Date(chat.timestamp?.toDate()).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl w-full p-4 rounded-xl ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : msg.role === 'error'
                    ? 'bg-red-600 rounded-bl-none'
                    : 'bg-gray-700 rounded-bl-none'
                }`}
              >
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) }}
                />
                {msg.sources && (
                  <div className="mt-2 pt-2 border-t border-gray-500 text-xs">
                    Sources: {msg.sources.join(', ')}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 p-4 rounded-xl">
                <BeatLoader color="#9CA3AF" size={8} />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-gray-700 rounded-lg p-3 pr-10 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={1}
              />
              <button
                type="button"
                onClick={() => setShowUpload(true)}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-200"
              >
                <PaperClipIcon className="w-5 h-5" />
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500 p-3 rounded-lg disabled:opacity-50"
            >
              <ArrowUpIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Upload Document</h2>
              <button onClick={() => setShowUpload(false)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleFileUpload} className="space-y-4">
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full bg-gray-700 rounded-lg p-2"
              >
                <option value="document">Document</option>
                <option value="pdf">PDF</option>
                <option value="text">Text</option>
              </select>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="px-4 py-2 bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded-lg"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ai;