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
  try {
    const url = new URL(targetPath, BASE_URL).toString();

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });

    if (!res.ok) {
      console.error('API Error:', res.status, res.statusText);
      throw new APIError(
        res.status,
        res.statusText,
        await res.json().catch(() => null)
      );
    }

    return res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const mutator = async (targetPath: string, arg: any) => {
  try {
    const url = new URL(targetPath, BASE_URL).toString();

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
      mode: 'cors',
    });

    if (!res.ok) {
      console.error('API Error:', res.status, res.statusText);
      throw new APIError(
        res.status,
        res.statusText,
        await res.json().catch(() => null)
      );
    }

    return res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
