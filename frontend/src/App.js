import { BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom'
import { isAuthenticated } from "./auth.js"

//pages and components
import Login from './pages/Login';
import Home from './pages/Home.js'
import UsrCRUD from './pages/UsrCRUD.js';
import PrinterCRUD from './pages/PrinterCRUD.js';
import CSVUploader from './components/csvuploader.js';
import Navbar from './components/Navbar'
import ServerInfo from './pages/ServerInfo.js'
import AdminCRUD from './pages/AdminCRUD.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
          <Route
            path='/login'
            element = {<Login />}
            />
            <Route element={<PrivateRoute />}>
            <Route 
            path="/" 
            element={<Home />} />
            <Route
            path='/csv-uploader'
            element = {<CSVUploader />}
            />
            <Route
            path='/user-list'
            element = {<UsrCRUD />}
            />
            <Route
            path='/printer-list'
            element = {<PrinterCRUD />}
            />
            <Route
            path='/csv-uploader'
            element = {<CSVUploader />}
            />
            <Route 
            path="/serverinfo" 
            element={<ServerInfo />} 
            />
            <Route 
            path="/AdminCRUD" 
            element={<AdminCRUD />} 
            />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

// PrivateRoute Component
function PrivateRoute() {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
  }

export default App;
