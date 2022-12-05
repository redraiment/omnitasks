import fetch from 'cross-fetch';

const requestByUrl = (method, path, params) => {
  const query = new URLSearchParams(params).toString();
  const url = query.length ? `${path}?${query}` : path;
  return fetch(url, { method });
};

const requestByBody = (method, path, params) => fetch(path, {
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: typeof params !== 'undefined' ? JSON.stringify(params) : '',
});

export const request = (url, method = 'GET', params = undefined) => {
  const promise = (method === 'GET') ? requestByUrl(method, url, params) : requestByBody(method, url, params);
  return promise
    .then(response => response.json())
    .catch(exception => { console.debug('request', method, url, params, exception); });
};

export const graph = (query, variables = null) => request('/graphql', 'POST', {
  query,
  variables,
}).then(result => result && result.data ? Promise.resolve(result.data) : Promise.reject(result.errors))
