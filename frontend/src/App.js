import { BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components
import Home from './pages/Home.js'
import UsrCRUD from './pages/UsrCRUD.js';
import PrinterCRUD from './pages/PrinterCRUD.js';
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
