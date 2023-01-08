import { createRoot } from 'react-dom/client';
import { App } from './App/App';

import './styles/index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
