import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
// import App from './Overview'
import App from './App'
import '../src/styles/index.scss'
import './index.scss'
ReactDOM.render(
  ( <BrowserRouter>
    <App/>
  </BrowserRouter> ),
  document.getElementById('app')
)
