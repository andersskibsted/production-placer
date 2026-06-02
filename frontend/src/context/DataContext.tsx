import { createContext, useContext, useEffect, useState } from "react";
import { fetchRegions } from "../api/regions";
import { fetchCrops } from "../api/crops";
import type { Region, Crop } from "../api/types";

interface DataContextType {
  regions: Region[];
  crops: Crop[];
  highlightedRegions: string[];
  setHighlightedRegions: (regions: string[]) => void;
}

const DataContext = createContext<DataContextType>({ 
                                                  regions: [], 
                                                  crops: [],
                                                  highlightedRegions: [],
                                                  setHighlightedRegions: () => {}
                                                });

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [highlightedRegions, setHighlightedRegions] = useState<string[]>([]);

  useEffect(() => {
    fetchRegions().then((data) => {
      console.log("regions:", data)
      setRegions(data)
    });
    fetchCrops().then((data) =>
      {
        console.log("crops:", data)
        setCrops(data)

      });
  }, []);

  return (
    <DataContext.Provider value={{ regions, crops, highlightedRegions, setHighlightedRegions }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
