import './App.css';
import Header from './Header';
import OWPage from './OWPage';
import CtrlPage from './CtrlPage';

import {
  BrowserRouter as Router, 
  Routes,
  Route,
  } from 'react-router-dom';


function App() {

  return (
    <>
      <div className="">
        <Router>
          {/* <Header/> */}
          <Routes>
            <Route path="/" 
              element={<OWPage/>}
            />
            <Route path="/control" 
              element={<CtrlPage/>} 
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
