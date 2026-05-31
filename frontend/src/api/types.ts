
export interface Region {
  id: number;
  name: string;
}

export interface Crop {
    id: number;
    name: string;
}

export interface ProductionByYear {
    region: string;
    crop: string;
    amount: number | null;
}

export interface ProductionByYearRegionCrop {
  region: string;
  crop: string;
  amount: number | null;
}

export interface ProductionYear {
  amount: number | null;
  year: number;
}

export interface ApiError {
  error: string;
}
