const API_BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";

// Caching API key to avoid fetching it multiple times
let apiKeyCache = null;

// Function to fetch the API key
export const getApiKey = async () => {
  if (apiKeyCache) {
    return apiKeyCache;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/keys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch API key: ${response.statusText}`);
    }

    const data = await response.json();
    apiKeyCache = data.key;
    return apiKeyCache;
  } catch (error) {
    console.error("Error fetching API key:", error);
    throw error;
  }
};

// Function to fetch the menu data
export const fetchMenu = async () => {
  try {
    const apiKey = await getApiKey();
    const tenantId = localStorage.getItem("tenantId") || "JacobGHTruck";

    console.log("Fetching menu for tenant:", tenantId);

    const categories = ["wonton", "dip", "drink"];

    const categoryRequests = categories.map((category) =>
      fetch(`${API_BASE_URL}/menu?tenant=${tenantId}&type=${category}`, {
        headers: { "x-zocom": apiKey },
      }).then((response) => response.json())
    );

    const menuResponses = await Promise.all(categoryRequests);
    const allItems = menuResponses.flatMap((menuData) => menuData.items || []);

    return allItems;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
};

// Function to place an order
export const placeOrderApi = async (orderData) => {
  try {
    const apiKey = await getApiKey();
    const tenantId = localStorage.getItem("tenantId") || "JacobGhTruck";

    const itemIds = orderData.items.flatMap((item) =>
      Array(item.quantity).fill(item.id)
    );

    const response = await fetch(`${API_BASE_URL}/${tenantId}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
      body: JSON.stringify({ items: itemIds }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Status code:", response.status);
      console.log("Error text from server:", errorText);
      throw new Error("Failed to place order");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

