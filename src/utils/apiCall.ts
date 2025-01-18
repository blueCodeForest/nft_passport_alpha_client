const BASE_URL = 'http://localhost:3000';

export const fetcher = (targetPath: string) => {
  return fetch(new URL(targetPath, BASE_URL)).then((res) => res.json());
};

export const mutator = async (targetPath: string, arg: any) => {
  return fetch(new URL(targetPath, BASE_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
};
