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
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Produktnavn"
      />
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

      <button onClick={handleSubmit}>Gem produkt</button>
      {success && <p>Produkt gemt!</p>}
      {error && <p>{error}</p>}
    </div>
  )

}
