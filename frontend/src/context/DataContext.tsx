import { createContext, useContext, useEffect, useState } from "react";
import { fetchRegions } from "../api/regions";
import { fetchCrops } from "../api/crops";
import type { Region, Crop, Productions } from "../api/types";
import { fetchProductions } from "../api/productions";

interface DataContextType {
  regions: Region[];
  crops: Crop[];
  highlightedRegions: string[];
  setHighlightedRegions: (regions: string[]) => void;
  productions: Productions[];
  loadProductions: () => void;
}

const DataContext = createContext<DataContextType>({ 
                                                  regions: [], 
                                                  crops: [],
                                                  highlightedRegions: [],
                                                  setHighlightedRegions: () => {},
                                                  productions: [],
                                                  loadProductions: () => {}
                                                });

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [highlightedRegions, setHighlightedRegions] = useState<string[]>([]);
  const [productions, setProductions] = useState<Productions[]>([]);

  function loadProductions() {
  fetchProductions().then((data) => { console.log("loadProductions kaldt, data:", data);
      setProductions(data);
    });
}
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
    loadProductions();
  }, []);

  return (
    <DataContext.Provider value={{ regions, crops, highlightedRegions, setHighlightedRegions, productions, loadProductions }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
