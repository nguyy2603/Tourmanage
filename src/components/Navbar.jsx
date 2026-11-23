import { NavLink } from 'react-router-dom'
import { FaPlaneDeparture, FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/tin-tuc', label: 'Tin tức' },
  { to: '/gioi-thieu', label: 'Giới thiệu' },
  { to: '/quan-ly-tour', label: 'Quản lý tour' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

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
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
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
            {navItems.map((item) => (
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
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
