
export interface Region {
  region_id: number;
  name: string;
}

export interface Crop {
    crop_id: number;
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

export interface ProductionRegion {
  amount: number | null;
  region: string;
}

export interface ApiError {
  error: string;
}
