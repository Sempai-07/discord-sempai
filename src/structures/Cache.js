class Cache {
  constructor() {
    this.cache = new Map();
    this.events = {
      ready: [],
      update: [],
      delete: [],
      clear: []
    }
  }

  /**
   * Устанавливает значение в кеш
   * @param {string} key - ключ кеша
   * @param {*} value - значение кеша
   * @param {number} lifetime - время жизни значения в секундах
   */
  set(key, value, lifetime = 0) {
    const createdAt = Date.now();
    const expiresAt = lifetime > 0 ? createdAt + lifetime * 1000 : 0;
    this.cache.set(key, { value, createdAt, expiresAt });
    // update event
    const content = this.get(key)
    const newValue = { key, value, lifetime, createdAt, expiresAt };
    if (!content) {
    const oldValue = {key: key, content: content};
    this.emit('update', newValue, oldValue);
    } else {
    const oldValue = undefined;
    this.emit('update', newValue, oldValue);
    }
  }

  /**
   * Получает значение из кеша по ключу
   * @param {string} key - ключ кеша
   * @returns {*|undefined} - значение кеша или undefined, если ключ не найден или значение просрочено
   */
  get(key) {
    const cacheItem = this.cache.get(key);
    if (cacheItem && (cacheItem.expiresAt === 0 || Date.now() < cacheItem.expiresAt)) {
      return cacheItem.value;
    } else {
      this.delete(key);
      return undefined;
    }
  }

  /**
   * Удаляет значение из кеша по ключу
   * @param {string} key - ключ кеша
   */
  delete(key) {
    const cacheItem = this.cache.get(key);
    this.cache.delete(key);
    if (cacheItem) {
      const oldValue = { key, value: cacheItem.value, createdAt: cacheItem.createdAt, expiresAt: cacheItem.expiresAt };
      this.emit('delete', oldValue);
    }
  }

  /**
   * Очищает весь кеш
   */
  clear() {
    const oldValue = Array.from(this.cache.values()).map(cacheItem => ({
      key: cacheItem.key,
      value: cacheItem.value,
      createdAt: cacheItem.createdAt,
      expiresAt: cacheItem.expiresAt
    }));
    this.cache.clear();
    this.emit('clear', oldValue);
  }

  /**
   * Возвращает количество элементов в кеше
   * @returns {number} - количество элементов в кеше
   */
  size() {
    return this.cache.size;
  }
  
    /**
   * Возвращает массив всех ключей в кеше
   * @returns {Array<any>} - массив ключей
   */
  getKeys() {
    return Array.from(this.cache.keys());
  }
  
    /**
   * Возвращает массив всех значений в кеше
   * @returns {any} - массив значений
   */
  
  getValues() {
    return Array.from(this.cache.values()).map(cacheItem => cacheItem.value);
  }
  
    /**
   * Возвращает true, если ключ присутствует в кеше, и false в противном случае:
   * Возвращает {boolean} - присутствует ли ключ
   */
  
  has(key) {
    return this.cache.has(key);
  }
  
    /**
   * Возвращает время жизни значения в кеше по ключу
   * @returns {number} - время жизни
   */
  
  getExpiration(key) {
    const cacheItem = this.cache.get(key);
    return cacheItem ? cacheItem.expiresAt - cacheItem.createdAt : undefined;
  }
  
    /**
   * Возвращает дату и время создания значения в кеше по ключу
   * @returns {object} - дата и время
   */
  getCreatedAt(key) {
    const cacheItem = this.cache.get(key);
    return cacheItem ? new Date(cacheItem.createdAt) : undefined;
  }
  
    /**
   * Возвращает дату и время истечения срока действия значения в кеше по ключу
   * @returns {Array} - дата и время
   */
  
  getExpiresAt(key) {
    const cacheItem = this.cache.get(key);
    return cacheItem && cacheItem.expiresAt !== 0 ? new Date(cacheItem.expiresAt) : undefined;
  }
  
    /**
   * Возвращает ключ самого старого значения в кеше
   * @returns {object} - старый ключ
   */
   
  getOldestKey() {
    let oldestKey = null;
    let oldestCreatedAt = Infinity;
    for (const [key, cacheItem] of this.cache) {
        if (cacheItem.createdAt < oldestCreatedAt) {
            oldestKey = key;
            oldestCreatedAt = cacheItem.createdAt;
        }
    }
    return oldestKey;
  }
  
    /**
   * Возвращает ключ самого нового значения в кеше
   * @returns {object} - новий ключ
   */
  getNewestKey() {
      let newestKey = null;
      let newestCreatedAt = -Infinity;
      for (const [key, cacheItem] of this.cache) {
          if (cacheItem.createdAt > newestCreatedAt) {
              newestKey = key;
              newestCreatedAt = cacheItem.createdAt;
          }
      }
      return newestKey;
  }



  /**
   * Добавляет обработчик события
   * @param {string} eventName - название события
   * @param {Function} listener - обработчик события
   */
  on(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName].push(listener);
    }
  }

  /**
   * Удаляет обработчик события
   * @param {string} eventName - название события
   * @param {Function} listener - обработчик события
   */
  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(l => l !== listener);
    }
  }

  /**
   * Вызывает обработчики события
   * @param {string} eventName - название события
   * @param {*} eventData - данные события
   */
  emit(eventName, eventData) {
    if (this.events[eventName]) {
      for (const listener of this.events[eventName]) {
        listener(eventData);
      }
    }
  }
}

module.exports = Cache;