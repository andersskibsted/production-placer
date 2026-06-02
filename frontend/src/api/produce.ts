import { get } from "./client"
import type { ProduceByYear, ProduceYear, RegionsWithAvailableProduce } from "./types"
// import type { ProduceYear } from "./types"
import { post } from "./client"

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
