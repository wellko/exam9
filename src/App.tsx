import React from 'react';
import Navbar from "./Components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import HomePage from "./Containers/HomePage/HomePage";
import CategoryPage from "./Containers/CategoryPage/CategoryPage";

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/categories' element={<CategoryPage/>}/>
            <Route path='*' element={<h1 className='text-center' >Page not found</h1>}/>
        </Routes>
    </div>
  );
}

export default App;
