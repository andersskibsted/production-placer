import { useState } from "react"
import { useData } from "../context/DataContext"
import { fetchProductionRegions } from "../api/produce"

export function VerifyProductionRequirements() {
  const { crops } = useData()
  const [name, setName] = useState("")
  const [selectedCrops, setSelectedCrops] = useState<number[]>([])
  const [success, setSuccess] = useState(false)
  const [regions, setRegions] = useState<{name: string}[]>([])
  const [error, setError] = useState<string | null>(null)


  function toggleCrop(cropId: number) {
    setSelectedCrops((prev) =>
      prev.includes(cropId) ? prev.filter((id) => id !== cropId)
        : [...prev, cropId]
      )
  }

  // function handleSubmit() {
  //   if (selectedCrops.length === 0) return
  //   fetchProductionRegions(selectedCrops)
  //     .then(() => setSuccess(true))
  //     .catch((err) => setError(err.message))
  // }
  async function handleSubmit() {
    if (selectedCrops.length === 0) return;
    try {
      const result = await fetchProductionRegions(selectedCrops);
      setRegions(result.regions);
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  }

  return (
    <div>
      <div>
        {crops.map((c) => (
          <label key={c.crop_id}>
            <input
              type="checkbox"
              checked={selectedCrops.includes(c.crop_id)}
              onChange={() => toggleCrop(c.crop_id)}
            />
            {c.name}
          </label>

        ))}
      </div>

      <button onClick={handleSubmit}> Tjek tilgængelige råvarer</button>
      {success && (
        <div>
          <p>Der er tilgængelige råvarer i:</p>
          <ul>
            {regions.map((region, index) => (
              <li key={index}>{region.name}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}
