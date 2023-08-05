import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import MobileApp from './MobileApp';
import DesktopApp from './DesktopApp';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);



root.render(
 <App />
);