import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
            <Outlet />
            
        </main>
        <Footer />  
    </div>
  )
}
