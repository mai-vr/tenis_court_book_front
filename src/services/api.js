const TOKEN = "authToken";

const authenticatedFetch = async (url, options = {}) => {
  const token = localStorage.getItem(TOKEN);

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    window.location.href = "/login";

    return null;
  }

  return response;
};

export { authenticatedFetch };
