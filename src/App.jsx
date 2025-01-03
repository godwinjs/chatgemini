import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/main';
import './App.css';
const App = () => {
  
  React.useEffect(() => {}, []);
  
  return (
    <>
      <Sidebar />
      <Main />
    </>
  );
};

export default App;