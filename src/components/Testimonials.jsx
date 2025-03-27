import React from "react";

const testimonials = [
  {
    text: "Thanks to this platform, I found my dream job at MTN Cameroon. The process was smooth and the opportunities are truly local!",
    user: "Aminatou Bello",
    company: "MTN Cameroon",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    text: "As a software developer in Douala, I struggled to find good clients. This platform connected me with startups across Central Africa.",
    user: "Jean-Paul Ngassa",
    company: "Kiro'o Games",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    text: "I was able to hire three qualified accountants for my Yaoundé firm within days. The talent pool here is exceptional!",
    user: "Patrice Mvondo",
    company: "Mvondo & Associates",
    image: "https://randomuser.me/api/portraits/men/51.jpg"
  },
  {
    text: "After returning from France, this platform helped me transition back into the Cameroonian job market seamlessly.",
    user: "Nadia Ngo Nyobe",
    company: "Afriland First Bank",
    image: "https://randomuser.me/api/portraits/women/63.jpg"
  }
];

const Testimonials = () => {
  return (
    <div className="relative mt-15 border-neutral-700 bg-gray-50 py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="md:flex items-center justify-between">
          <div>
            <h2 className="xl:text-5xl lg:text-3xl text-2xl font-semibold text-gray-900">
              What Our Cameroonian Users Say
            </h2>
            <p className="text-xl mt-4 font-light text-gray-600">
              Connecting talent with opportunities across Douala, Yaoundé and beyond
            </p>
          </div>
          <button className="rounded-full md:my-0 my-4 bg-[#4b4efc] hover:bg-[#3a3dc7] text-lg text-white font-bold px-8 py-3 transition-colors">
            More Success Stories
          </button>
        </div>

        <div className="flex flex-wrap justify-center mt-10 gap-6">
          {testimonials.map((items, index) => (
            <div
              key={index}
              className="w-full sm:w-[45%] px-6 py-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-lg text-gray-700 italic mb-6">
                "{items.text}"
              </div>
              <div className="flex items-center">
                <img
                  src={items.image}
                  alt={items.user}
                  className="w-16 h-16 rounded-full mr-4 border-2 border-[#4b4efc]"
                />
                <div>
                  <h1 className="font-semibold text-gray-900">{items.user}</h1>
                  <span className="text-md text-gray-500 block">
                    {items.company}
                  </span>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Trusted by professionals and companies across Cameroon's major cities
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 mt-6">
            <img src="/mtn-logo.png" alt="MTN" className="h-10" />
            <img src="orange-logo.png" alt="Orange" className="h-10" />
            <img src="afriland-logo.png" alt="Afriland" className="h-10" />
            <img src="cimencam-logo.png" alt="Cimencam" className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;