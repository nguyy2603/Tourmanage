import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlaneDeparture, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Cột 1: Thông tin thương hiệu */}
        <div>
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
            <FaPlaneDeparture className="text-blue-500" />
            <span>VietTravel</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Hệ thống quản lý và cung cấp các tour du lịch chất lượng cao, mang lại trải nghiệm tuyệt vời nhất cho hành trình của bạn.
          </p>
          <div className="flex gap-4 text-gray-400 text-lg">
            <a href="#" className="hover:text-blue-500 transition-colors" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-red-500 transition-colors" aria-label="Youtube">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Cột 2: Điều hướng nhanh */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/tin-tuc" className="hover:text-blue-400 transition-colors">
                Tin tức & Sự kiện
              </Link>
            </li>
            <li>
              <Link to="/quan-ly-tour" className="hover:text-blue-400 transition-colors">
                Quản lý tour
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Thông tin liên hệ */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Thông tin liên hệ</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
              <span>123 Đường Du Lịch, Quận 1, TP. Hồ Chí Minh</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-500 flex-shrink-0" />
              <span>+84 (0)123 456 789</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500 flex-shrink-0" />
              <span>contact@viettravel.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Dòng bản quyền phía dưới */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-4 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} VietTravel. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer