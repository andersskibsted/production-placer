// src/components/ui/ProductionTable.tsx
import { useState } from "react"
import { useData } from "../context/DataContext"
import { fetchProduceByYearCrop } from "../api/produce"
import type { ProduceRegion } from "../api/types"
import { DenmarkMap } from "./MapProduce"

export function ProduceTableRegions() {
    const { regions, crops } = useData()
    const [year, setYear] = useState<string>("")
    const [cropId, setCropId] = useState<number | null>(null)
    const [data, setData] = useState<ProduceYear[]>([])
    const [error, setError] = useState<string | null>(null)

    function handleFetch() {
        if (!year || !cropId) return
        fetchProduceByYearCrop(year, cropId)
            .then(setData)
            .catch((err) => setError(err.message))
    }

    return (
      <div>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Indtast årstal"
        >
        </input>
        <select onChange={(e) => setCropId(Number(e.target.value))}>
          <option value="">Vælg afgrøde</option>
          {crops.map((c) => (
            <option key={c.crop_id} value={c.crop_id}>{c.name}</option>
          ))}
            </select>

            <button onClick={handleFetch}>Hent data</button>
            {error && <p>{error}</p>}


        <DenmarkMap data={data} />

            <table>
                <thead>
                    <tr>
                        <th>År</th>
                        <th>Produktion (mio. kg)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.region}>
                            <td>{row.region}</td>
                            <td>{row.farms ?? "ingen data"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
