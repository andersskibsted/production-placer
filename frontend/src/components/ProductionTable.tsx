// src/components/ui/ProductionTable.tsx
import { useState } from "react"
import { useData } from "../context/DataContext"
import { fetchProductionByRegionCrop } from "../api/productions"
import type { ProductionYear } from "../api/types"

export function ProductionTable() {
    const { regions, crops } = useData()
    const [regionId, setRegionId] = useState<number | null>(null)
    const [cropId, setCropId] = useState<number | null>(null)
    const [data, setData] = useState<ProductionYear[]>([])
    const [error, setError] = useState<string | null>(null)

    function handleFetch() {
        if (!regionId || !cropId) return
        fetchProductionByRegionCrop(regionId, cropId)
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
            <button onClick={handleFetch}>Hent data</button>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>År</th>
                        <th>Produktion (mio. kg)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.year}>
                            <td>{row.year}</td>
                            <td>{row.amount ?? "ingen data"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
