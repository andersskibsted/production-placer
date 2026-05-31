import { useState } from "react"
import { fetchProductionByYear } from "../../api/productions"
import type { ProductionByYear } from "../../api/types"

export function ProductionByYear() {
    const [year, setYear] = useState<string>("")
    const [data, setData] = useState<ProductionByYear[]>([])
    const [error, setError] = useState<string | null>(null)

    function handleFetch() {
        fetchProductionByYear(Number(year))
            .then(setData)
            .catch((err) => setError(err.message))
    }

  return (
    <div>
        <div>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Indtast årstal"
          />
          <button onClick={handleFetch}>Hent data</button>
        </div>

          {error && <p>{error}</p>}

          <div>
          {data.map((row, i) => (
            <p key={i}>{row.region} - {row.crop} - {row.amount}</p>
          ))}
          </div>
    </div>
    )

}
