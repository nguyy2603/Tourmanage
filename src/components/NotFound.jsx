import React from 'react'
import { Link } from 'react-router-dom'
export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-24">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="mt-4 text-gray-600">Trang bạn tìm không tồn tại.</p>
      <Link
        to="/"
        className="mt-6 inline-block px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Về trang chủ
      </Link>
    </div>
  )
}
