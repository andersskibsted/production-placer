import { useEffect, useState } from 'react'
import { api } from './api/client'
import './App.css'

// interface HelloResponse {
//   message: string
// }

// export default function App() {
//   const [message, setMessage] = useState<string>('')

//   useEffect(() => {
//     api.get<HelloResponse>('/api/hello')
//       .then(data => setMessage(data.message))
//       .catch(err => console.error(err))
//   }, [])

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <h1>{message || 'Indlæser...'}</h1>
//     </div>
//   )
// }

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>Hello productionPlacer!</h1>
    </div>

  )
}




export default App
