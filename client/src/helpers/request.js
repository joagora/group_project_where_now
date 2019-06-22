const Request = function (url) {
  this.url = url;
  this.proxyurl = "https://cors-anywhere.herokuapp.com/";
};

Request.prototype.get = function () {
  return fetch(this.proxyurl + this.url)
    .then((response) => response.json());
};

Request.prototype.post = function (payload) {
  return fetch(this.proxyurl + this.url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json());
};

module.exports = Request;
