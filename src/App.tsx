// import { useState } from 'react'
import './App.css'
import { skipData } from './data/skip'
import SkipGrid from './components/SkipGrid'
function App() {
  return (
    <>
       <div className="min-h-screen w-full">
      <h1 className="text-center text-3xl font-bold px-6 pt-6 pb-2">Choose Your Skip Size</h1>
      <h3 className='text-center text-2xl font-semibold px-4 py-2 text-gray-500'>Select the skip size that best suits your needs</h3>
      <SkipGrid skips={skipData} />
    </div>
    </>
  )
}

export default App
