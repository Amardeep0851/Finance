import React, { Suspense } from 'react'
import ClientPage from "./components/client-page"

function page() {
  return (
    <Suspense>
    <ClientPage />
    </Suspense>
  )
}

export default page