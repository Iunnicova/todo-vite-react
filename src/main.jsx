//точка входа здесь происходит запуск react приложения
// createRoot создает корень реакт приложения(новая схема из реакт 18)находим в html document.getElementById('root')туда вставляется все приложение

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
