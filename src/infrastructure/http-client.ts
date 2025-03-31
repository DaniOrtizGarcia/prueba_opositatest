type HttpMethod = 'GET';

interface RequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
}

const httpRequest = async (
  endpoint: string,
  method: HttpMethod = 'GET',
  options: RequestOptions = {}
): Promise<Response> => {  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config: RequestInit = {
    method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const response = await fetch(`${endpoint}`, config);

  return response;
};

export const get = (endpoint: string): Promise<Response> => 
  httpRequest(endpoint, 'GET');
