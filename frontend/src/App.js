import { BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components
import Home from './pages/Home.js'
import UserCRUD from './pages/UserCRUD.js';
import CSVUploader from './components/csvuploader.js';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route
            path='/'
            element = {<Home />}
            />
            <Route
            path='/csv-uploader'
            element = {<CSVUploader />}
            />
            <Route
            path='/user-list'
            element = {<UserCRUD />}
            />
            <Route
            path='/csv-uploader'
            element = {<CSVUploader />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
