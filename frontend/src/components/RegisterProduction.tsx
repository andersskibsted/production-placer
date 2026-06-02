import { useState } from "react"
import { useData } from "../context/DataContext"
import { registerProduction } from "../api/productions"

export function RegisterProduction() {
  const { regions } = useData()
  const [name, setName] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<number[]>([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function toggleRegion(regionId: number) {
    setSelectedRegion([regionId])
  }

  function handleSubmit() {
    if (!name || selectedRegion.length == 0) return
    registerProduction(selectedRegion, name)
      .then(() => setSuccess(true))
      .catch((err) => setError(err.message))
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Produktnavnet der skal produceres"
      />
        <div>
          {regions.map((r) => (
            <label key={r.region_id}>
              <input
                type="checkbox"
                checked={selectedRegion.includes(r.region_id)}
                onChange={() => toggleRegion(r.region_id)}
              />
              {r.name}
            </label>
          ))}
        </div>

      <button onClick={handleSubmit}>Registrer produktion</button>
      {success && <p>Produktionen af {name} i {selectedRegion} er gemt!</p>}
      {error && <p>{error}</p>}
    </div>
  )

}
