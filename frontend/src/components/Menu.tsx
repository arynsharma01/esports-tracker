// Menu.tsx
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  };

  const handleLogout = () => {
    localStorage.removeItem('Authorization')
    navigate('/signin')
  };

  return (
    <div className="relative">
      {/* Toggle Menu Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col items-center justify-center w-10 h-10 bg-gray-800 rounded-md text-white"
        aria-label="Toggle Menu"
      >
        <div className={`h-1 w-8 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <div className={`h-1 w-8 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
        <div className={`h-1 w-8 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-48 bg-white border border-gray-300 shadow-lg rounded-md">
          <ul>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate('/add/team',{replace :true})}
            >
              Add new Team 
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate('/view/myteams',{replace :true})}
            >
              View My teams
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer text-red-500"
              onClick={handleLogout}
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
