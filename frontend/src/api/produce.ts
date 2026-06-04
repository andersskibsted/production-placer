import { get } from "./client"
import type { ProduceByYear, ProduceYear, RegionsWithAvailableProduce, CropRequirements } from "./types"
// import type { ProduceYear } from "./types"
import { post } from "./client"

interface CropSelection {
  cropId: number;
  amount: number;
}

export function fetchProduceByYear(year: number): Promise<ProduceByYear[]> {
    return get<ProduceByYear[]>(`/api/produce/${year}`)
}

export function fetchProduceByYearRegionCrop(
    year: number,
    regionId: number,
    cropId: number
): Promise<ProduceByYear[]> {
    return get<ProduceByYear[]>(`/api/produce/${year}/${regionId}/${cropId}`)
}

export function fetchProduceByRegionCrop(regionId: number, cropId: number): Promise<ProduceYear[]> {
  return get<ProduceYear[]>(`/api/produce/${regionId}/${cropId}`)
}

export function fetchProduceByYearCrop(year: number, cropId: number): Promise<ProduceRegion[]> {
  return get<ProductRegion[]>(`/api/produce/year/${year}/${cropId}`)
}

export function fetchProductionRegions(cropIds: number[]):
Promise<RegionsWithAvailableProduce> {
  return post<RegionsWithAvailableProduce>("/api/produce/", {
    requirements: cropIds
  })
}

export function fetchRegionsWithRequiredResources(requirements: CropSelection[]):
Promise<{ regions: { name: string }[] }> {
  return post<{ regions: { name: string }[] }>("/api/produce/", {
    requirements: requirements
  })
}
