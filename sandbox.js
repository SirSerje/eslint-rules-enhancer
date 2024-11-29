class HttpClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }
  request(url, options = {}) {
    const fullUrl = `${this.baseURL}${url}`;
    return new Promise((resolve, reject) => {
      fetch(fullUrl, options)
        .then(response => {
          if (!response.ok) reject('Request failed');
          else resolve(response.json());
        })
        .catch(error => reject(error));
    });
  }
  get(url) {
    return this.request(url, { method: 'GET' });
  }
  post(url, body) {
    return this.request(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  }
  put(url, body) {
    return this.request(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  }
  delete(url) {
    return this.request(url, { method: 'DELETE' });
  }
}

class SecondClass { };


const regexpVarToTest = '/\.+\g';
const regexpVarToTestSecond
  = new Regexp('\.+\g')
// some relevant regexp explanation
new RegExp(
  // second relevant comment
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)

// some relevant explanation
new RegExp(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
