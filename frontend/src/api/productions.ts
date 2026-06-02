import { get, post } from "./client"

export function registerProduction(regionId: number, productName: string):
Promise<{ production_id: number }> {
  return post<{ production_id }>("/api/productions/", {
    region_id: regionId,
    product_name: productName
  })
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
