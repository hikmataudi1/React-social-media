import React from 'react';
import './App.css';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { CreatePost} from './pages/crete-post/createpost';
import {BrowserRouter as Router , Route ,Routes} from "react-router-dom"
import { Navbar } from './components/navbar';






function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>  
          <Routes>
            <Route path='/' element={<Main/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/createpost' element={<CreatePost/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
