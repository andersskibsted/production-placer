import { get } from "./client"
import type { Crop } from "./types"

export function fetchCrops(): Promise<Crop[]> {
    return get<Crop[]>("/api/crops/")
}
