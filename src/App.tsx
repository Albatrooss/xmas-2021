import React, { useState } from 'react';
import Main from './pages/Main';

import Login from './pages/Login';

import 'antd/dist/antd.css';
import './App.css';

export type User = {
  name: string;
  gift: string;
}

function App() {
  const [auth, setAuth] = useState<User | null>(null);

  if (!auth) {
    return <Login setAuth={setAuth} />
  }
  return <Main auth={auth} setAuth={setAuth} />
}

export default App;
