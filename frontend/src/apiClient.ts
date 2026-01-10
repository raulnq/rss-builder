const API_URL = import.meta.env.VITE_API_URL;

export async function getAuthToken(): Promise<string | null> {
  const clerk = window.Clerk;

  if (!clerk?.session) {
    return null;
  }

  return await clerk.session.getToken();
}

export interface ProblemDocument {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
}

export type ApiResult<T> =
  | { ok: true; data: T; status: number }
  | { ok: false; error: ProblemDocument; status: number };

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResult<T>> {
  const authToken = await getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      type: '/problems/unknown-error',
      title: 'Unknown Error',
      status: response.status,
    }));
    return { ok: false, error, status: response.status };
  }

  if (response.status === 204) {
    return { ok: true, data: undefined as T, status: response.status };
  }

  const data = await response.json();
  return { ok: true, data, status: response.status };
}

export const api = {
  get: <T>(endpoint: string) => apiFetch<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    apiFetch<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => apiFetch<T>(endpoint, { method: 'DELETE' }),
};
