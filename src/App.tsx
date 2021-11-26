import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

import Login from './pages/Login';

import 'antd/dist/antd.css';
import './App.css';

export type User = {
  name: string;
  gift: string;
} | null

function App() {
  const [auth, setAuth] = useState<User>(null);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main auth={auth} setAuth={setAuth} />} />
          <Route path='/login' element={<Login setAuth={setAuth} />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
