import { createContext, useContext, useEffect, useState } from "react";
import { fetchRegions } from "../api/regions";
import { fetchCrops } from "../api/crops";
import type { Region, Crop } from "../api/types";

interface DataContextType {
  regions: Region[];
  crops: Crop[];
}

const DataContext = createContext<DataContextType>({ regions: [], crops: [] });

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);

  useEffect(() => {
    fetchRegions().then(setRegions);
    fetchCrops().then(setCrops);
  }, []);

  return (
    <DataContext.Provider value={{ regions, crops }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
