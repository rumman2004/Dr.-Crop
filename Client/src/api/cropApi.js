const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000/api";

const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed. Please try again.");
  }

  return data;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return parseResponse(response);
};

export const signup = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password }),
  });
  return parseResponse(response);
};

export const analyzeCropImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/scans/analyze`, {
    method: "POST",
    headers: getHeaders(true),
    body: formData,
  });

  return parseResponse(response);
};

export const fetchScanHistory = async (limit = 20) => {
  const response = await fetch(`${API_BASE_URL}/scans/history?limit=${limit}`, {
    headers: getHeaders(),
  });
  return parseResponse(response);
};

export const fetchJournals = async (page = 1, limit = 20) => {
  const response = await fetch(`${API_BASE_URL}/journals?page=${page}&limit=${limit}`, {
    headers: getHeaders(),
  });
  return parseResponse(response);
};

export const fetchHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return parseResponse(response);
};

export const createCheckoutSession = async (packageId) => {
  const response = await fetch(`${API_BASE_URL}/stripe/create-checkout-session`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ packageId }),
  });
  return parseResponse(response);
};

export const verifyPaymentSession = async (sessionId) => {
  const response = await fetch(`${API_BASE_URL}/stripe/verify-session`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ sessionId }),
  });
  return parseResponse(response);
};

export const fetchProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    headers: getHeaders(),
  });
  return parseResponse(response);
};
