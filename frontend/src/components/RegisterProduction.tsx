import { useState } from "react"
import { useData } from "../context/DataContext"
import { registerProduction } from "../api/productions"

export function RegisterProduction() {
  const { regions, crops } = useData()
  const [name, setName] = useState("")
  const [selectedCrops, setSelectedCrops] = useState<number[]>([])
  const [selectedRegion, setSelectedRegion] = useState<number[]>([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submittedName, setSubmittedName] = useState('')
  const [submittedRegion, setSubmittedRegion] = useState('')

  function toggleRegion(regionId: number) {
    setSelectedRegion([regionId])
  }

  function toggleCrop(cropId: number) {
    setSelectedCrops((prev) =>
      prev.includes(cropId)
        ? prev.filter((id) => id !== cropId)
        : [...prev, cropId]
    )
  }

  function handleSubmit() {
    if (!name || selectedRegion.length == 0) return
    setError(null);
    setSubmittedName(name);
    setSubmittedRegion(selectedRegion);

    registerProduction(selectedRegion[0], selectedCrops, name)
      .then(() => setSuccess(true))
      .catch((err) => setError(err.message))
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="The product being produced"
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

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {crops.map((c) => (
            <label key={c.crop_id} style={{ width: "200px", display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="checkbox"
                checked={selectedCrops.includes(c.crop_id)}
                onChange={() => toggleCrop(c.crop_id)}
              />
              {c.name}
            </label>
          ))}
        </div>

      <button onClick={handleSubmit}>Register production</button>
      {success &&
        <p>Production of {submittedName} in {regions.find((r) => r.region_id === submittedRegion[0])?.name ?? "unknown region" } is registered!
                  </p>}
      {error && <p>{error}</p>}
    </div>
  )

}
