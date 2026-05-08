import { useEffect, useState } from 'react'
import { api } from './api/client'
import './App.css'

interface HelloResponse {
  message: string
}

interface TestItem {
  id: number
  name: string
  value: string
}

function App() {
  const [message, setMessage] = useState<string>('')
  const [items, setItems] = useState<TestItem[]>([])

  useEffect(() => {
    api.get<HelloResponse>('/api/hello')
      .then(data => setMessage(data.message))
      .catch(err => console.error(err))

    api.get<TestItem[]>('/api/items')
      .then(data => setItems(data))
      .catch(err => console.err(err))
  }, [])

  return (

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '40px' }}>
    <h1>Hello productionPlacer!</h1>
    <h1>{message || 'Indlæser...'}</h1>

    <h2>Test items fra database</h2>
      {items.map(item => (
        <div key={item.id}>
          <p>{item.name}: {item.value}</p>
        </div>
      ))}
  </div>
  )
}

// function App() {
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <h1>Hello productionPlacer!</h1>
//     </div>

//   )
// }




export default App
