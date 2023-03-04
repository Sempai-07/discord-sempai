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
  
  static async postRequest(url, data) {
    let {data: responseData, status} = await axios.post(url, data);
    responseData.status = status;
    return responseData;
  }
  
  static async putRequest(url, data) {
    let {data: responseData, status} = await axios.put(url, data);
    responseData.status = status;
    return responseData;
  }
  
  static async deleteRequest(url) {
    let {data: responseData, status} = await axios.delete(url);
    responseData.status = status;
    return responseData;
  }
}

module.exports = Link;
