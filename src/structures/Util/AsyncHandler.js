class AsyncHandler {
  static async forEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  static async map(array, callback) {
    const result = [];
    for (let index = 0; index < array.length; index++) {
      result.push(await callback(array[index], index, array));
    }
    return result;
  }

  static async filter(array, callback) {
    const result = [];
    for (let index = 0; index < array.length; index++) {
      const value = array[index];
      if (await callback(value, index, array)) {
        result.push(value);
      }
    }
    return result;
  }

  static async reduce(array, callback, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : array[0];
    for (let index = initialValue !== undefined ? 0 : 1; index < array.length; index++) {
      accumulator = await callback(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  static async find(array, callback) {
    for (let index = 0; index < array.length; index++) {
      const value = array[index];
      if (await callback(value, index, array)) {
        return value;
      }
    }
    return undefined;
  }

  static async findIndex(array, callback) {
    for (let index = 0; index < array.length; index++) {
      if (await callback(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  static async every(array, callback) {
    for (let index = 0; index < array.length; index++) {
      if (!(await callback(array[index], index, array))) {
        return false;
      }
    }
    return true;
  }

  static async some(array, callback) {
    for (let index = 0; index < array.length; index++) {
      if (await callback(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  static async delay(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  static async retry(fn, retries, delayMs) {
    let error = null;
    for (let i = 0; i < retries; i++) {
      try {
        const result = await fn();
        return result;
      } catch (err) {
        error = err;
        await AsyncHandler.delay(delayMs);
      }
    }
    throw error;
  }

  static async timeout(promise, timeoutMs, errorMessage) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error(errorMessage)), timeoutMs)),
    ]);
  }

  static async race(promiseArray) {
    return Promise.race(promiseArray);
  }

  static async parallel(promiseArray) {
    return Promise.all(promiseArray);
  }

  static async series(promiseArray) {
    const result = [];
    for (const promise of promiseArray) {
      const value = await promise;
      result.push(value);
    }
    return result;
  }

  static async waterfall(promiseArray) {
    let result = null;
    for (const promise of promiseArray) {
      result = await promise(result);
    }
    return result;
  }
 }
 
module.exports = AsyncHandler;