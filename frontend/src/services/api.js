import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/configurations";

const api = axios.create({
  baseURL: API_BASE_URL
});

export const configurationAPI = {
  getConfiguration: (id) => api.get(`/${id}`),
  updateRemark: (id, remark) => api.put(`/${id}`, {remark})
};

export default api;
