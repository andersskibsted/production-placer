import { get, post, del } from "./client"
import type { Productions } from "./types"

export function registerProduction(regionId: number, cropId: number[], productName: string ):
Promise<{ production_id: number }> {
  return post<{ production_id }>("/api/productions/", {
    region_id: regionId,
    crop_ids: cropId,
    product_name: productName
  })
}

export function fetchProductions(): Promise<Productions[]> {
  return get<Productions[]>(`/api/productions/`)
}

export function deleteProduction(production_id: number): Promise<void> {
  return del(`/api/productions/${production_id}`)
}
// export function fetchProductionByYear(year: number): Promise<ProductionByYear[]> {
//     return get<ProductionByYear[]>(`/api/productions/${year}`)
// }

// export function fetchProductionByYearRegionCrop(
//     year: number,
//     regionId: number,
//     cropId: number
// ): Promise<ProductionByYear[]> {
//     return get<ProductionByYear[]>(`/api/productions/${year}/${regionId}/${cropId}`)
// }

// export function fetchProductionByRegionCrop(regionId: number, cropId: number): Promise<ProductionYear[]> {
//   return get<ProductionYear[]>(`/api/productions/${regionId}/${cropId}`)
// }

// export function fetchProductionByYearCrop(year: number, cropId: number): Promise<ProductionRegion[]> {
//   return get<ProductRegion[]>(`/api/productions/year/${year}/${cropId}`)
// }
