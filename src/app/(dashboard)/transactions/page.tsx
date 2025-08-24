import React, { Suspense } from 'react'
import TransactionClient from "./components/transaction-client"

function Page() {
  return (
    <Suspense fallback="Loading...">
      <TransactionClient />
    </Suspense>
  )
}

export default Page