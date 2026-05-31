import { useData } from "../../context/DataContext.tsx";

export function CropSelector() {
  const { crops } = useData();

  return (
    <select>
      {crops.map((crop) => (
        <option key={crop.id} value={crop.id}>
          {crop.name}
        </option>
      ))}
    </select>
  );
}
