type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions<TBody = any> {
  body?: TBody;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}

export class FetchClient {
  constructor(private baseUrl: string = "") {}

  private buildUrl(url: string, query?: FetchOptions["query"]) {
    if (!query) return url;

    const params = new URLSearchParams();
    Object.entries(query)
      .filter(([, v]) => v !== undefined)
      .forEach(([k, v]) => params.append(k, String(v)));

    return `${url}?${params.toString()}`;
  }

  private async request<TResponse, TBody = any>(
    method: HttpMethod,
    url: string,
    options: FetchOptions<TBody> = {},
  ): Promise<TResponse> {
    const fullUrl = this.buildUrl(this.baseUrl + url, options.query);

    const res = await fetch(fullUrl, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw {
        status: res.status,
        message: data?.message || "Request failed",
        errors: data?.errors,
      };
    }

    return data as TResponse;
  }

  get<TResponse>(url: string, options?: FetchOptions) {
    return this.request<TResponse>("GET", url, options);
  }
}

export const api = new FetchClient("http://localhost:5000/api");
