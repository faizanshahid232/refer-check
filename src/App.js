import './App.css';
import Header from './components/Header';
import React from 'react';
import { Routes , Route } from 'react-router-dom';
import SuccessFailure from './components/SuccessFail';

function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Header/>}></Route>
      <Route exact path='/success' element={<SuccessFailure/>}></Route>
    </Routes>
    </>
  );
}

export default App;
