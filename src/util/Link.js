const axios = require('axios');

class Link {
  static async request(url) {
    let {data, status} = await axios.get(url);
    data.status = status;
    return data;
    }
  
  static async validLink(url) {
    let res = await axios.get(url).catch(e => undefined);
    return res ? true : false;
  }
  
  static async validImage(url) {
    let response = false;
    try {
        response = await axios
            .get(url)
            .then((res) => res.headers["content-type"].startsWith("image"));
    } catch (e) {
      response = false;
    }
    return response;
  }
}

module.exports = Link;

// © 2022 @Sempai Development