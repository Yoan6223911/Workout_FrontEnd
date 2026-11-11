// Shared HTTP transport: JSON encoding, response parsing and server errors.
export function createHttpClient(baseUrl, fetcher = fetch) {
  const base = baseUrl.replace(/\/+$/, "");
  return async function request(path, method = "GET", body) {
    const response = await fetcher(`${base}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body
        ? {
            body: JSON.stringify(body),
          }
        : {}),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(
        result.error ||
          result.message ||
          `Erreur du serveur (${response.status})`,
      );
    return result.data;
  };
}
