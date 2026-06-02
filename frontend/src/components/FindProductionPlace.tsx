import { useState } from "react";
import { useData } from "../context/DataContext";
import { fetchRegionsWithRequiredResources } from "../api/produce"
interface CropSelection {
  cropId: number;
  amount: number;
}

export function FindProductionPlace() {
  const { crops, setHighlightedRegions } = useData();
  const [selections, setSelections] = useState<CropSelection[]>([
    { cropId: 0, amount: 0 }
  ]);
  const [error, setError] = useState<string | null>(null);

  function addCrop() {
    setSelections([...selections, { cropId: 0, amount: 0 }]);
  }

  function updateSelection(index: number, field: keyof CropSelection, value: number) {
    const updated = [...selections];
    updated[index] = { ...updated[index], [field]: value };
    setSelections(updated);
  }

  function removeCrop(index: number) {
    setSelections(selections.filter((_, i) => i !== index));
  }

  function handleSearch() {
    if (selections.some(s => !s.cropId || !s.amount)) return;

    // TODO: erstat med rigtigt API kald når backenden er klar
    fetchRegionsWithRequiredResources(selections)
      .then(result => setHighlightedRegions(result.map(r => r.name)))
      .catch(err => setError(err.message));

    // Mock resultat til test:
    setHighlightedRegions(["Region Nordjylland", "Region Midtjylland"]);
  }

  return (
    <div>
      <h2>Find suitable production locations</h2>
      <p>Select the needed crops along with the amount and we will locate a region that can provide the necessary goods</p>

      {selections.map((sel, i) => (
        <div key={i}>
          <select
            value={sel.cropId}
            onChange={e => updateSelection(i, "cropId", Number(e.target.value))}
          >
            <option value={0}>Choose crop</option>
            {crops.map(c => (
              <option key={c.crop_id} value={c.crop_id}>{c.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={sel.amount || ""}
            onChange={e => updateSelection(i, "amount", Number(e.target.value))}
            placeholder="Amount (tonnes)"
          />
          {selections.length > 1 && (
            <button onClick={() => removeCrop(i)}>Fjern</button>
          )}
        </div>
      ))}

      <button onClick={addCrop}>+ Add crop</button>
      <button onClick={handleSearch}>Find regions</button>

      {error && <p>{error}</p>}
    </div>
  );
}
