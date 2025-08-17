// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// App 組件：顯示客戶列表
function MyButton() {
  return (
    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">I'm a button</button>
  );
}
function App() {
  return (
    <div>
      <h1>Customers</h1>
      <p className="bg-red-500 text-white">Hello Vite + React + Tailwind CSS!</p>
      <MyButton/>

    </div>
    

  );
}

export default App;