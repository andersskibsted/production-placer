// async function get<T>(url: string): Promise<T> {
//   const res = await fetch(url)
//   if (!res.ok) throw new Error(`API fejl: ${res.status}`)
//   return res.json()
// }

// export const api = { get }
async function get<T>(url: string): Promise<T> {
  const res = await fetch(url)
  console.log('Status:', res.status, 'URL:', url)
  if (!res.ok) throw new Error(`API fejl: ${res.status}`)
  return res.json()
}

export const api = { get }
