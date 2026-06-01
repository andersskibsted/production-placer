import { get } from "./client"
import type { ProduceByYear } from "./types"
import type { ProduceYear } from "./types"

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
