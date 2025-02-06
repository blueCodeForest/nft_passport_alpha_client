class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'APIError';
  }
}

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const fetcher = async (targetPath: string) => {
  const res = await fetch(new URL(targetPath, BASE_URL));
  if (!res.ok) {
    throw new APIError(
      res.status,
      res.statusText,
      await res.json().catch(() => null)
    );
  }
  return res.json();
};

export const mutator = async (targetPath: string, arg: any) => {
  const res = await fetch(new URL(targetPath, BASE_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    throw new APIError(
      res.status,
      res.statusText,
      await res.json().catch(() => null)
    );
  }

  return res.json();
};
