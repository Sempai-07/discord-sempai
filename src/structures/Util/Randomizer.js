class Randomizer {
  static generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }

  static generateRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  static generateRandomBoolean() {
    return Math.random() < 0.5;
   }
   
  static generateRandomDate(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeRange = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeRange;
    const randomDate = new Date(startDate.getTime() + randomTime);
    return randomDate.toISOString().slice(0, 10);
    }
   
  static generateRandomObjectElement(obj) {
    const keys = Object.keys(obj);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return obj[randomKey];
   }
   
   static generateRandomIpAddress() {
    const num = () => Math.floor(Math.random() * 256);
    return `${num()}.${num()}.${num()}.${num()}`;
   }
   
   static generateRandomIpAddress() {
    const num = () => Math.floor(Math.random() * 256);
    return `${num()}.${num()}.${num()}.${num()}`;
   }
   
   static generateRandomStringNumber(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
    return result;
   }
   
   static generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
   }

static generateRandomCoordinates() {
    const latitude = Math.random() * 180 - 90;
    const longitude = Math.random() * 360 - 180;
    return { latitude, longitude };
   }

static generateRandomPhoneNumber() {
    const areaCode = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const exchangeCode = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const subscriberNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `+X (${areaCode}) ${exchangeCode}-${subscriberNumber}`;
   }

static generateRandomEmail() {
    const providers = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const provider = this.generateRandomElement(providers);
    const username = this.generateRandomString(8);
    return `${username}@${provider}`;
   }

static generateRandomPassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
   }
   
   static generateRandomDateDDMMYYYY(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeRange = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeRange;
    const randomDate = new Date(startDate.getTime() + randomTime);
    return randomDate.toLocaleDateString('ru-RU');
   }
   
   static generateRandomTimeHHMMSS() {
    const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
   }
   
   static generateRandomGrayScale() {
    const gray = Math.floor(Math.random() * 256);
    return `rgb(${gray}, ${gray}, ${gray})`;
}
static generateRandomBase64String(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return btoa(result);
    }
    
    static generateRandomDateDDMMYYYY(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeRange = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeRange;
    const randomDate = new Date(startDate.getTime() + randomTime);
    return randomDate.toLocaleDateString('ru-RU');
   }
   
   static generateRandomDateTimeDDMMYYYYHHMMSS(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeRange = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeRange;
    const randomDate = new Date(startDate.getTime() + randomTime);
    return randomDate.toLocaleString('ru-RU');
   }
   
   static generateRandomUrl() {
    const domains = ['com', 'ru', 'org', 'net', 'io'];
    const protocol = this.generateRandomElement(['http', 'https']);
    const domain = this.generateRandomString(10);
    const tld = this.generateRandomElement(domains);
    return `${protocol}://${domain}.${tld}`;
   }
   
   static generateRandomYear(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
   }
}

module.exports = Randomizer;