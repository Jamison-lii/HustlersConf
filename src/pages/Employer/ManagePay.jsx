import React from 'react'
import FapshiInitiatePay from './InitiatePay'
import FapshiPaymentStatus from './PaymentStatus'
import FapshiExpirePay from './ExpirePay'
import FapshiUserTransactions from './FapshiUserTransactions'
import FapshiTransactionSearch from './FapshiTransactionSearch'
import FapshiServiceBalance from './FapshiServiceBalance'
import FapshiPayout from './FapshiPayout'

const ManagePay = () => {
  return (
    <div>
        <FapshiInitiatePay/>
        
      <FapshiPaymentStatus/>
      <FapshiExpirePay/>
      <FapshiUserTransactions/>
      <FapshiTransactionSearch/>
      <FapshiServiceBalance/>
      <FapshiPayout/>
    </div>
  )
}

export default ManagePay