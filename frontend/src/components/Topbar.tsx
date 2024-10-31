import { useNavigate } from "react-router-dom";
import { TopbarButton } from "./TopbarButton";

export function Topbar() {
  const navigate = useNavigate();

  return (
    <div className="w-screen border shadow-md bg-white">
      <div className="flex justify-between items-center h-20 px-4 py-2 space-x-4">

        {/* Logo Section */}
        <div onClick={() => navigate('/')} className="flex-shrink-0">
          <img
            className="w-10 h-10 md:w-14 md:h-14 hover:cursor-pointer"
            src="/et.png"
            alt="et"
          />
        </div>

        
        <div className="flex space-x-3 text-sm  md:space-x-6  md:text-base  ">
          <TopbarButton label="Home" link="/" />
          <TopbarButton label="Tournaments" link="/tournaments" />
          <TopbarButton label="Contact us" link="/contact" />
        </div>

        
        <div>
          {localStorage.getItem('Authorization') == null ? (
            <button
              className="bg-sky-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-sky-600"
              onClick={() => navigate('signin')}
            >
              Login
            </button>
          ) : (
            <button
              className="bg-red-400 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-red-500"
              onClick={() => {
                localStorage.removeItem('Authorization');
                navigate('/')
              }}
            >
              Signout
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
}
