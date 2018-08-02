import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',
});

axiosInstance.interceptors.request.use((req) => {
  const _method = req.method.toUpperCase();
  if (_method === 'PUT' || _method === 'PATCH' || _method === 'DELETE') {
    req.method = 'post';
    req.headers = req.headers || {};
    req.params = req.params || {};
    Object.assign(req.headers, { 'X-HTTP-Method-Override': _method });
    Object.assign(req.params, { _method });
  }
  return req;
});

axiosInstance.interceptors.request.use((req) => {
  req.headers = req.headers || {};
  Object.assign(req.headers, {
    'X-Requested-With': 'XMLHttpRequest',
  });
  return req;
});

axiosInstance.interceptors.response.use(({ data }) => {
  const { msg } = data;
  if (/\n\n/.test(msg)) {
    const [, message, _suggestion] = msg.match(/(.+?)\n\n((?:.|\n)+)/);
    Object.assign(data, { msg: message, _suggestion });
  }
  return data;
});

export const { get, post, put, patch, delete: del } = axiosInstance;
