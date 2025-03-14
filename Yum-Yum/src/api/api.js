const BASE_API_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";

// Cache to store API key
let apiKeyCache = null;

// Function to retrieve the API Key from the server
export const fetchApiKey = async () => {
  if (apiKeyCache) {
    console.log("🔄 Reusing cached API key:", apiKeyCache);
    return apiKeyCache;
  }

  try {
    // Request to get the API key
    const response = await fetch(`${BASE_API_URL}/keys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`Failed to fetch API key: ${response.statusText}`);

    const { key } = await response.json();
    apiKeyCache = key;
    console.log("🔑 API key fetched:", apiKeyCache);
    return apiKeyCache;
  } catch (error) {
    console.error("❌ API key fetch error:", error);
    throw error;
  }
};

// Function to create a new tenant
export const createNewTenant = async (apiKey) => {
  const storedTenantId = localStorage.getItem("tenantId");

  if (storedTenantId) {
    console.log("🔄 Reusing existing tenant ID:", storedTenantId);
    return storedTenantId;
  }

  try {
    const response = await fetch(`${BASE_API_URL}/tenants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": apiKey,
      },
      body: JSON.stringify({ name: "JacobGhTruck" }),
    });

    if (!response.ok) {
      console.warn("⚠️ Tenant already exists or request failed.");
      return null;
    }

    const { id } = await response.json();
    localStorage.setItem("tenantId", id);
    console.log("✅ New tenant created:", id);
    return id;
  } catch (error) {
    console.error("❌ Tenant creation error:", error);
    throw error;
  }
};

// Function to fetch the menu
export const getMenu = async () => {
  try {
    const apiKey = await fetchApiKey();
    let tenantId = localStorage.getItem("tenantId") || "JacobGhTruck"; // Default tenant if none exists

    console.log("📥 Fetching menu for tenant:", tenantId);

    const categories = ["wonton", "dip", "drink"];

    // Fetch all categories
    const categoryRequests = categories.map((category) =>
      fetch(`${BASE_API_URL}/menu?tenant=${tenantId}&type=${category}`, {
        headers: { "x-zocom": apiKey },
      }).then((response) => response.json())
    );

    // Wait for all category data
    const menuData = await Promise.all(categoryRequests);
    const items = menuData.flatMap((categoryData) => categoryData.items || []);

    console.log("✅ Menu data fetched:", items);
    return items;
  } catch (error) {
    console.error("❌ Menu fetch error:", error);
    throw error;
  }
};

