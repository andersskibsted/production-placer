import { useData } from "../../context/DataContext.tsx";

export function RegionSelector() {
  const { regions } = useData();

  return (
    <select>
      {regions.map((region) => (
        <option key={region.id} value={region.id}>
          {region.name}
        </option>
      ))}
    </select>
  );
}
