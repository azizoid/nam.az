import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/index.css';

// ReactDOM.render(<App />, document.getElementById('root'));
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
