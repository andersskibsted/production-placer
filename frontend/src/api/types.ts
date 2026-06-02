
export interface Region {
  region_id: number;
  name: string;
}

export interface Crop {
    crop_id: number;
    name: string;
}

export interface ProduceByYear {
    region: string;
    crop: string;
    farms: number | null;
}

export interface ProduceByYearRegionCrop {
  region: string;
  crop: string;
  farms: number | null;
}

export interface ProduceYear {
  farms: number | null;
  year: number;
}

export interface ProduceRegion {
  farms: number | null;
  region: string;
}

export interface RegionsWithAvailableProduce {
  regions: string[];
}

export interface CropRequirements {
  requirements: [number, number][]
}

export interface ApiError {
  error: string;
}
