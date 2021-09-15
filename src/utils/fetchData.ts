export async function fetchData<T>(
  url: RequestInfo,
  options: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  const data = await response.json();
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  }).then(() => data);
}
