import { useState } from "react";
import { useData } from "../context/DataContext";
import { fetchProduceByYearRegionCrop } from "../api/produce";
import type { ProduceByYearRegionCrop } from "../api/types";

export function ProduceSelector() {
    const { regions, crops } = useData();
    const [year, setYear] = useState<string>("");
    const [regionId, setRegionId] = useState<number | null>(null);
    const [cropId, setCropId] = useState<number | null>(null);
    const [data, setData] = useState<ProduceByYearRegionCrop[]>([]);
    const [error, setError] = useState<string | null>(null);

    const isValidYear = (value: number): boolean => {
        const regex = /^20((0[5-9])|(1[0-9])|(2[0-5]))$/;
        const str_value = String(value);
        console.log(str_value);
        return regex.test(str_value);
    };

    function handleFetch() {
        if (!regionId || !cropId || !year) return;
        if (isValidYear(year)) {
            fetchProduceByYearRegionCrop(Number(year), regionId, cropId)
                .then(setData)
                .catch((err) => setError(err.message));
        } else {
            setError("Not a valid year. We have data from 2005-2025");
        }
    }

    return (
        <div>
            <h3>
                You can browse the produce yield for a region in a given year by filling in the
                blanks below.
            </h3>
            <select onChange={(e) => setRegionId(Number(e.target.value))}>
                <option value="">Select region</option>
                {regions.map((r) => (
                    <option key={r.region_id} value={r.region_id}>
                        {r.name}
                    </option>
                ))}
            </select>
            <select onChange={(e) => setCropId(Number(e.target.value))}>
                <option value="">Select produce</option>
                {crops.map((c) => (
                    <option key={c.crop_id} value={c.crop_id}>
                        {c.name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="type in year: eg 2012"
            />
            <button onClick={handleFetch}>Fetch Data</button>
            {error && <p>{error}</p>}
            <div>
                {data.map((row, i) => (
                    <p key={i}>
                        {row.region} - {row.crop} - {row.yield} tonnes
                    </p>
                ))}
            </div>
        </div>
    );
}
