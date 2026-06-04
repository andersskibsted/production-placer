//const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
const BASE_URL = import.meta.env.VITE_API_URL ?? "";


export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error ?? `HTTP ${response.status}`)
  }
  if (response.status === 204) return {} as T;
  return response.json() as Promise<T>;
}

export const get = <T>(path: string) => request<T>(path);

export const post = <T>(path: string, data: unknown) =>
  request<T>(path, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const del = (path: string) =>
  request<void>(path, { method: "DELETE" });