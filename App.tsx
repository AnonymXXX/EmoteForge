import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ToolPage from './components/ToolPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ToolPage />} />
      <Route path="/:slug" element={<ToolPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
