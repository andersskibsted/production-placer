import { post } from "./client"

export function postProduct(name: string, cropIds: number[]):
Promise<{ product_id: number }> {

  return post<{ product_id: number }>("/api/products/", {
    name,
    crop_ids: cropIds
  })
}
