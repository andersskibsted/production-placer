import { useData } from "../../context/DataContext.tsx";

export function CropSelector() {
  const { crops } = useData();

  return (
    <select>
      {crops.map((crop) => (
        <option key={crop.crop_id} value={crop.crop_id}>
          {crop.name}
        </option>
      ))}
    </select>
  );
}
