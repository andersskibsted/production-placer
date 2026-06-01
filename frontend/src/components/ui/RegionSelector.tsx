import { useData } from "../../context/DataContext.tsx";

export function RegionSelector() {
  const { regions } = useData();

  return (
    <select>
      {regions.map((region) => (
        <option key={region.region_id} value={region.region_id}>
          {region.name}
        </option>
      ))}
    </select>
  );
}
