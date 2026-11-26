const envApiUrl: unknown = import.meta.env.VITE_API_URL;

export const API_BASE_URL =
  typeof envApiUrl === "string" && envApiUrl.length > 0
    ? envApiUrl
    : "http://localhost:8080/api/v1";

const TOKEN_STORAGE_KEY = "n5study.token";

export class ApiError extends Error {
  readonly status: number;
  readonly details: string[];

  constructor(status: number, message: string, details: string[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export function readStoredToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeStoredToken(token: string) {
  try {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch {
    return;
  }
}

export function removeStoredToken() {
  try {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    return;
  }
}

interface ErrorPayload {
  mensagem?: string;
  detalhes?: string[];
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT";
  body?: unknown;
  authenticated?: boolean;
}

async function sendRequest(path: string, options: RequestOptions): Promise<Response> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (options.authenticated !== false) {
    const token = readStoredToken();
    if (token !== null) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? "GET",
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw new ApiError(0, "Nao foi possivel conectar ao servidor.", []);
  }

  if (!response.ok) {
    throw await buildApiError(response);
  }

  return response;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await sendRequest(path, options);

  return (await response.json()) as T;
}

export async function apiRequestOrNull<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T | null> {
  const response = await sendRequest(path, options);

  if (response.status === 204) {
    return null;
  }

  return (await response.json()) as T;
}

async function buildApiError(response: Response): Promise<ApiError> {
  let payload: ErrorPayload = {};

  try {
    payload = (await response.json()) as ErrorPayload;
  } catch {
    payload = {};
  }

  return new ApiError(
    response.status,
    payload.mensagem ?? "Nao foi possivel completar a requisicao.",
    payload.detalhes ?? []
  );
}
