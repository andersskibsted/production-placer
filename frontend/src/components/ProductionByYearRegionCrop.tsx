import { useState } from "react"
import { useData } from "../context/DataContext"
import { fetchProductionByYearRegionCrop } from "../api/productions"
import type { ProductionByYearRegionCrop } from "../api/types"

export function ProductionSelector() {
    const { regions, crops } = useData()
    const [year, setYear] = useState<string>("")
    const [regionId, setRegionId] = useState<number | null>(null)
    const [cropId, setCropId] = useState<number | null>(null)
    const [data, setData] = useState<ProductionByYear[]>([])
    const [error, setError] = useState<string | null>(null)

    function handleFetch() {
        if (!regionId || !cropId || !year) return
        fetchProductionByYearRegionCrop(Number(year), regionId, cropId)
            .then(setData)
            .catch((err) => setError(err.message))
    }

    return (
        <div>
            <select onChange={(e) => setRegionId(Number(e.target.value))}>
                <option value="">Vælg region</option>
                {regions.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                ))}
            </select>
            <select onChange={(e) => setCropId(Number(e.target.value))}>
                <option value="">Vælg afgrøde</option>
                {crops.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Indtast årstal"
            />
            <button onClick={handleFetch}>Hent data</button>
            {error && <p>{error}</p>}
            <div>
                {data.map((row, i) => (
                    <p key={i}>{row.region} - {row.crop} - {row.amount}</p>
                ))}
            </div>
        </div>
    )
}
