import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import DataContextProvider from './context/DataContextProvider.tsx'
import DeleteModalContextProvider from './context/DeleteModalContextProvider.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <DataContextProvider  >
      <DeleteModalContextProvider>
        <App />
      </DeleteModalContextProvider>
    </DataContextProvider>
  </React.StrictMode>,
)
