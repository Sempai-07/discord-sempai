const axios = require('axios');

class Link {
  constructor() {
    // изначально хотелось сделать: this.url.... Но это тупость
  }

  async request(url) {
    let {data, status} = await axios.get(url);
    data.status = status;
    return data;
    }
  
  async validLink(url) {
    let res = await axios.get(url).catch(e => undefined);
    return res ? true : false;
  }
  
  async validImage(url) {
    let response = false;
    try {
        response = await axios
            .get(url)
            .then((res) => res.headers["content-type"].startsWith("image"));
    } catch (e) {
        console.error(e);
        response = false;
    }
    return response;
  }
}

module.exports = Link;