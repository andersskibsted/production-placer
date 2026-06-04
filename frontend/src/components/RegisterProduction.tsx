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

  const isValidProductionName = (pname: string): boolean => {
    const regex = /^[A-Z]([a-z,A-Z]+\s?)*[0-9]*$/; // Requires capital starting letter followed by 0 or more letters with an optional whitespace. Lastly the name can be finised with a number.
    const str_pname = String(pname);
    console.log(str_pname);
    return regex.test(str_pname);
  };

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
    if (isValidProductionName(name)) {
    setError(null);
    setSubmittedName(name);
    setSubmittedRegion(selectedRegion);

    registerProduction(selectedRegion[0], selectedCrops, name)
      .then(() => setSuccess(true))
      .catch((err) => setError(err.message))
    } else {
      setError("Not a valid production name. Must start with a capital letter, not special symbols allowed and numbers are only allowed at the end.")
    }
  }

  return (
    <div>
      <h3>Add production to the database.</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name of production"
      />
      <h3>Select region you want to place your production.</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
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
      <h3>Select the produce you need for your production.</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
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
