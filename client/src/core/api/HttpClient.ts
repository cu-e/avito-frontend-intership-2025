export class HttpClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private buildHeaders(headers?: HeadersInit): HeadersInit {
        return {
            'content-type': 'application/json',
            ...headers
        }
    }

    private async request<T>(url: string, options: RequestInit): Promise<T> {
        const res = await fetch(this.baseUrl + url, {
            ...options,
            headers: this.buildHeaders(options.headers)
        })

        if (!res.ok) {
            const text = await res.text();
            throw new Error(
                `[API] error ${res.status}: ${text || res.statusText}`
            );
        }

        return res.json();
    }

    get<T>(url: string) {
        return this.request<T>(url, {method: 'GET'});
    }

    post<T>(url: string, body?: unknown) {
        return this.request<T>(url, {method: 'POST', body: JSON.stringify(body)});
    }
}