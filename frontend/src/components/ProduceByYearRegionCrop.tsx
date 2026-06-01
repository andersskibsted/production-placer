import { useState } from "react"
import { useData } from "../context/DataContext"
import { fetchProduceByYearRegionCrop } from "../api/produce"
import type { ProduceByYearRegionCrop } from "../api/types"

export function ProduceSelector() {
    const { regions, crops } = useData()
    const [year, setYear] = useState<string>("")
    const [regionId, setRegionId] = useState<number | null>(null)
    const [cropId, setCropId] = useState<number | null>(null)
    const [data, setData] = useState<ProduceByYear[]>([])
    const [error, setError] = useState<string | null>(null)

    function handleFetch() {
        if (!regionId || !cropId || !year) return
        fetchProduceByYearRegionCrop(Number(year), regionId, cropId)
            .then(setData)
            .catch((err) => setError(err.message))
    }

    return (
        <div>
            <select onChange={(e) => setRegionId(Number(e.target.value))}>
                <option value="">Vælg region</option>
                {regions.map((r) => (
                    <option key={r.region_id} value={r.region_id}>{r.name}</option>
                ))}
            </select>
            <select onChange={(e) => setCropId(Number(e.target.value))}>
                <option value="">Vælg afgrøde</option>
                {crops.map((c) => (
                    <option key={c.crop_id} value={c.crop_id}>{c.name}</option>
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
                    <p key={i}>{row.region} - {row.crop} - {row.farms}</p>
                ))}
            </div>
        </div>
    )
}
