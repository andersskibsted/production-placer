import './App.css'
import { CropSelector } from './components/ui/CropSelector'
import { RegionSelector } from './components/ui/RegionSelector'
import { ProduceByYear } from './components/ui/ProduceByYear'
import { ProduceSelector } from './components/ProduceByYearRegionCrop'
import { ProduceTable } from './components/ProduceTable'
import { BackgroundMusic } from './components/audio/BackgroundMusic'
import { ProductForm } from './components/ui/ProductForm'
import { ProduceTableRegions } from './components/ProduceTableRegions'
import { DenmarkMap } from './components/MapProduce'
import { VerifyProductionRequirements } from './components/VerifyProductionRequirements'
import { RegisterProduction } from './components/RegisterProduction'
function App() {
  return (
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', minHeight: '100vh', gap: '40px' }}>
  {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '40px' }}> */}
    <h1>Hello productionPlacer!</h1>
      {/* <BackgroundMusic /> */}
      <div>
        <CropSelector />
        <RegionSelector />
      </div>
    <h2>Test items fra database</h2>
    <div>
      <ProduceSelector />
    </div>
    <div>
      <ProduceTable />
    </div>
    <div>
      <ProductForm />
    </div>
    <div>
      <ProduceTableRegions />
    </div>
    <div>
      {/* <DenmarkMap data={[ */}
      {/*   { name: "Region Nordjylland", amount: 26.5 }, */}
      {/*   { name: "Region Midtjylland", amount: 51.8 }, */}
      {/*   { name: "Region Syddanmark", amount: 58.4 }, */}
      {/*   { name: "Region Sjælland", amount: 27.1 }, */}
      {/*   { name: "Region Hovedstaden", amount: 4.5 }, */}
      {/* ]} /> */}
        <VerifyProductionRequirements />
    </div>
    <div>
      <RegisterProduction />
    </div>
  </div>
  )
}





export default App
