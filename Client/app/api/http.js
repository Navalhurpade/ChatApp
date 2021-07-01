import axios from "axios";

const CONNECTION_URL = "http://192.168.23.228:8080";

axios.defaults.baseURL = CONNECTION_URL;

const get = axios.get;

const post = axios.post;

const put = axios.put;

const patch = axios.patch;

export default {
  get,
  post,
  put,
  patch,
};
