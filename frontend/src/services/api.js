import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

let _token = localStorage.getItem('token') || null;

API.interceptors.request.use(config => {
  if (_token) config.headers.Authorization = `Bearer ${_token}`;
  return config;
});

export function setToken(token) {
  _token = token;
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}

export const auth = {
  login: async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    if (res.data.token) setToken(res.data.token);
    return res.data;
  },
  register: async (payload) => {
    const res = await API.post('/auth/register', payload);
    return res.data;
  },
  logout: () => setToken(null)
};

export const rooms = {
  list: async () => (await API.get('/rooms')).data,
  add: async (room) => (await API.post('/rooms/add', room)).data,
  update: async (id, room) => (await API.put(`/rooms/${id}`, room)).data,
  remove: async (id) => (await API.delete(`/rooms/${id}`)).data,
  get: async (id) => (await API.get(`/rooms/${id}`)).data
};

export const bookings = {
  list: async () => (await API.get('/bookings')).data,
  create: async (payload) => (await API.post('/bookings', payload)).data,
  availability: async (from, to) => (await API.get('/rooms/available', { params: { from, to } })).data
};

export const upload = {
  file: async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await API.post('/uploads', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res.data;
  }
};

export default API;
