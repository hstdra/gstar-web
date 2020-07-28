import axios from 'axios';

class Request {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_PATH;
    this.isRefreshing = false;
    this.failedRequests = [];
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    this.beforeRequest = this.beforeRequest.bind(this);
    this.onRequestFailure = this.onRequestFailure.bind(this);
    this.processQueue = this.processQueue.bind(this);
    this.client.interceptors.request.use(this.beforeRequest);
    this.client.interceptors.response.use(
      this.onRequestSuccess,
      this.onRequestFailure
    );
  }

  beforeRequest(request) {
    const token = localStorage.getItem('accessToken');
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  }

  static onRequestSuccess(response) {
    return response.data;
  }

  async onRequestFailure(err) {
    const { response } = err;
    if (response.status === 401) {
      window.location.href = '/sign-in';
    }
    throw response;
  }

  processQueue(error, token = null) {
    this.failedRequests.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedRequests = [];
  }
}

const request = new Request();

export default request.client;
