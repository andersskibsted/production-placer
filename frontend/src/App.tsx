import './App.css'
import { CropSelector } from './components/ui/CropSelector'
import { RegionSelector } from './components/ui/RegionSelector'
import { ProduceByYear } from './components/ui/ProduceByYear'
import { ProduceSelector } from './components/ProduceByYearRegionCrop'
import { ProduceTable } from './components/ProduceTable'
import { BackgroundMusic } from './components/audio/BackgroundMusic'
import { ProductForm } from './components/ui/ProductForm'
import { ProduceTableRegions } from './components/ProduceTableRegions'
import { DenmarkMap } from './components/DenmarkMap'
import { FindProductionPlace } from './components/FindProductionPlace'
import { RegisterProduction } from './components/RegisterProduction'
function App() {
  return (
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', minHeight: '100vh', gap: '40px' , color: 'white'}}>
  {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '40px' }}> */}
    <div style={{ position: "relative", width: "190px", height: "180px" }}>
      <div style={{
        position: "absolute",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        backgroundColor: "#e00000"
      }}/>
      <img src="/data/tractor.svg" width={150} height={150} style={{ position: "relative", marginTop: "20px" }}/>
    </div>

    <h1>Welcome to ProductionPlacer! </h1>
    <h2>We are here to help you find the perfect spot for your next business endeavour, <br /> as long as what you need is raw produce from the wonderful farmers of Denmark!</h2>
      {/* <BackgroundMusic /> */}

    <div className="section">
      <ProduceSelector />
    </div>
    
    <div className="section">
      <ProduceTable />
    </div>

    <div className="section">
      <FindProductionPlace />
      <DenmarkMap data={[
      ]} />
    </div>
    {/* <div className="section"> */}
      {/* <ProductForm /> */}
    {/* </div> */}
    <div className="section">
      <RegisterProduction />
    </div>
  </div>
  )
}





export default App
