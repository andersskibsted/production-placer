import './App.css'
import { CropSelector } from './components/ui/CropSelector'
import { RegionSelector } from './components/ui/RegionSelector'
import { ProductionByYear } from './components/ui/ProductionByYear'
import { ProductionSelector } from './components/ProductionByYearRegionCrop'
import { ProductionTable } from './components/ProductionTable'
import { BackgroundMusic } from './components/audio/BackgroundMusic'

function App() {
  return (

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '40px' }}>
    <h1>Hello productionPlacer!</h1>
      <div>
        <CropSelector />
        <RegionSelector />
      </div>
    <h2>Test items fra database</h2>
    <div>
      <ProductionSelector />
    </div>
    <div>
      <ProductionTable />
    </div>

  </div>
  )
}





export default App
