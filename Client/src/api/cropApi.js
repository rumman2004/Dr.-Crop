const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000/api";

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed. Please try again.");
  }

  return data;
};

export const analyzeCropImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/scans/analyze`, {
    method: "POST",
    body: formData,
  });

  return parseResponse(response);
};

export const fetchScanHistory = async (limit = 20) => {
  const response = await fetch(`${API_BASE_URL}/scans/history?limit=${limit}`);
  return parseResponse(response);
};

export const fetchHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return parseResponse(response);
};
