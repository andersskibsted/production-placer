import { get } from "./client";
import type { Region } from "./types"

export function fetchRegions(): Promise<Region[]> {
    return get<Region[]>("/api/regions/");
}
