import { useState } from "react"
import { useData } from "../../context/DataContext"
import { postProduct } from "../../api/products"

export function ProductForm() {
  const { crops } = useData()
  const [name, setName] = useState("")
  const [selectedCrops, setSelectedCrops] = useState<number[]>([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function toggleCrop(cropId: number) {
    setSelectedCrops((prev) =>
      prev.includes(cropId)
        ? prev.filter((id) => id !== cropId)
        : [...prev, cropId]
    )
  }

  function handleSubmit() {
    if (!name || selectedCrops.length == 0) return
    postProduct(name, selectedCrops)
      .then(() => setSuccess(true))
      .catch((err) => setError(err.message))
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h2>Add your production to the database</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Production name"
      />
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

      <button onClick={handleSubmit}>Save production</button>
      {success && <p>Production saved!</p>}
      {error && <p>{error}</p>}
    </div>
  )

}
