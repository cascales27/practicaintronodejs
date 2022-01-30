function isAPIRequest(req) {
    return req.originalUrl.indexOf('/api/');
  }

  module.exports = {
      isAPIRequest
  }