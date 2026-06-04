// src/components/ui/ProductionTable.tsx
import { useState } from "react"
import { useData } from "../context/DataContext"
import { fetchProduceByRegionCrop } from "../api/produce"
import type { ProduceYear } from "../api/types"

export function ProduceTable() {
    const { regions, crops } = useData()
    const [regionId, setRegionId] = useState<number | null>(null)
    const [cropId, setCropId] = useState<number | null>(null)
    const [data, setData] = useState<ProduceYear[]>([])
    const [error, setError] = useState<string | null>(null)

    function handleFetch() {
        if (!regionId || !cropId) return
        fetchProduceByRegionCrop(regionId, cropId)
            .then(setData)
            .catch((err) => setError(err.message))
    }

    return (
        <div>
        <h3>Check to see the development in yields for a given region from 2005-2025.</h3>
            <select onChange={(e) => setRegionId(Number(e.target.value))}>
                <option value="">Select region</option>
                {regions.map((r) => (
                    <option key={r.region_id} value={r.region_id}>{r.name}</option>
                ))}
            </select>
            <select onChange={(e) => setCropId(Number(e.target.value))}>
                <option value="">Select crop</option>
                {crops.map((c) => (
                    <option key={c.crop_id} value={c.crop_id}>{c.name}</option>
                ))}
            </select>
            <button onClick={handleFetch}>Fetch data</button>
            {error && <p>{error}</p>}
            <table style={{ margin: '0 auto' }}>
                <thead>
                    <tr>
                        <th>År</th>
                        <th>Production (tonnes)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.year}>
                            <td>{row.year}</td>
                            <td>{row.yield ?? "no data"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
