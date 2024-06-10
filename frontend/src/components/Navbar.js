import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpenCSV = () => {
    navigate('/csv-uploader'); 
  };
  const backtohome = () => {
    navigate('/'); 
  };
  const userlist = () => {
    navigate('/user-list')
  }
  const printerlist = () => {
    navigate('/printer-list')
  }
  const serverinfo = () => {
    navigate('/serverinfo')
  }
  const admmincrud = () => {
    navigate ('/AdminCRUD')
  }
  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };
  

    return( 
  <header class="h-16 w-full flex items-center relative justify-start px-5 space-x-10 bg-gray-800">
      <div className="h-10 w-10 text-white flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white">
      <button onClick={backtohome} >
        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
      </svg>

    </button>
    </div>
  <div class="flex flex-row flex grow"></div>

    <div class="flex flex-row items-end justify-end">

    <div class="flex flex-row bg-gray-800 text-white items-end">
      <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
               <button onClick={userlist}>
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                </svg>
                </button>
              </div>

    
              <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                <button onClick={printerlist}>
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"/>
                </svg>
                </button>
              </div>


              <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
              <button onClick={handleOpenCSV}>
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m2.665 9H6.647A1.647 1.647 0 0 1 5 15.353v-1.706A1.647 1.647 0 0 1 6.647 12h1.018M16 12l1.443 4.773L19 12m-6.057-.152-.943-.02a1.34 1.34 0 0 0-1.359 1.22 1.32 1.32 0 0 0 1.172 1.421l.536.059a1.273 1.273 0 0 1 1.226 1.718c-.2.571-.636.754-1.337.754h-1.13"/>
                </svg>
                </button>
              </div>


              <div class="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                <button onClick={ serverinfo }>
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 6c0 1.657-3.134 3-7 3S5 7.657 5 6m14 0c0-1.657-3.134-3-7-3S5 4.343 5 6m14 0v6M5 6v6m0 0c0 1.657 3.134 3 7 3s7-1.343 7-3M5 12v6c0 1.657 3.134 3 7 3s7-1.343 7-3v-6"/>
                </svg>
                </button>
              </div>
    </div>
    </div>

    <div class="flex flex-shrink-0 items-center space-x-4 text-white">
      
      
      <div class="flex flex-col items-end">
        <div class="text-md font-medium ">CSO</div>
        <div class="text-sm font-regular">Administrador</div>
      </div>
      
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-10 w-10 flex items-center justify-center rounded-full cursor-pointer hover:text-gray-800 hover:bg-white hover:duration-300 hover:ease-linear focus:bg-white"
            id="options-menu"
          >
            {/* Use your profile image here */}
            <img src="https://scontent.fccs1-2.fna.fbcdn.net/v/t39.30808-6/340806879_1352510465333142_7958739702558969872_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SoWPwoqXeikQ7kNvgG8_0og&_nc_ht=scontent.fccs1-2.fna&oh=00_AYAt94K1w9igObjfJtuePXvtW048jDQtiadoRy3KhlQkjg&oe=665E9330" 
                 alt="Logo" 
                 className="rounded-full w-full h-full object-cover"
            />
          </button>
        </div>

        {isOpen && ( // Conditionally render dropdown menu
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <button
                type="button"
                onClick={() => { 
                  admmincrud()
                  setIsOpen(false); 
                }}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Administration
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
         </div> 
      </div>
    </header>
  );
};

export default  Navbar