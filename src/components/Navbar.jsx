import { NavLink } from 'react-router-dom'
import { FaPlaneDeparture, FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/tin-tuc', label: 'Tin tức' },
  { to: '/gioi-thieu', label: 'Giới thiệu' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const { currentUser, profile, isAdmin, logout } = useAuth()
  const visibleNavItems = isAdmin
    ? [...navItems, { to: '/quan-ly-tour', label: 'Quản lý tour' }]
    : navItems

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
    }`

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <FaPlaneDeparture />
            <span>VietTravel</span>
          </NavLink>

          <div className="hidden md:flex gap-2">
            {visibleNavItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="max-w-32 truncate text-sm text-gray-600" title={profile?.displayName || currentUser.email}>
                  {profile?.displayName || currentUser.email}
                </span>
                <button type="button" onClick={logout} className="rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to="/dang-nhap" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600">Đăng nhập</NavLink>
                <NavLink to="/dang-ky" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">Đăng ký</NavLink>
              </div>
            )}
          </div>

          <button
            type="button"
            className="md:hidden text-gray-700 text-xl"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Mở menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            {visibleNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            {currentUser ? (
              <button type="button" onClick={logout} className="rounded-md border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">Đăng xuất</button>
            ) : (
              <>
                <NavLink to="/dang-nhap" onClick={() => setOpen(false)} className={linkClass({ isActive: false })}>Đăng nhập</NavLink>
                <NavLink to="/dang-ky" onClick={() => setOpen(false)} className={linkClass({ isActive: false })}>Đăng ký</NavLink>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
