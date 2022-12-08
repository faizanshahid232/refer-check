import './App.css';
import Header from './components/Header';
import React from 'react';
import { Routes , Route } from 'react-router-dom';
import SuccessFailure from './components/SuccessFail';
import Fail from './components/Fail';

function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Header/>}></Route>
      <Route exact path='/success' element={<SuccessFailure/>}></Route>
      <Route exact path='/invalidcode' element={<Fail/>}></Route>
    </Routes>
    </>
  );
}

export default App;
