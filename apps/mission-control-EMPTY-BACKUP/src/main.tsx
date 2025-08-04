import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🎯 MISSION CONTROL LÄUFT!</h1>
      <p>✅ Endlich geschafft!</p>
      <p>🚀 Localhost:3000 functional!</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
