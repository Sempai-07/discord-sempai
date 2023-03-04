class PromiseUtils {
  static resolve(value) {
    return Promise.resolve(value);
  }

  static reject(error) {
    return Promise.reject(error);
  }

  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static all(promises) {
    return Promise.all(promises);
  }

  static race(promises) {
    return Promise.race(promises);
  }

  static allSettled(promises) {
    return Promise.allSettled(promises);
  }

  static any(promises) {
    return Promise.any(promises);
  }

  static try(func) {
    return new Promise(resolve => resolve(func()));
  }

  static promisify(func) {
    return (...args) =>
      new Promise((resolve, reject) =>
        func(...args, (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        })
      );
  }

  static promisifyMethod(object, methodName) {
    return (...args) =>
      new Promise((resolve, reject) =>
        object[methodName](...args, (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        })
      );
  }

  static callbackify(func) {
    return (...args) => {
      const callback = args.pop();
      func(...args)
        .then(result => callback(null, result))
        .catch(error => callback(error));
    };
  }

  static callbackifyMethod(object, methodName) {
    return (...args) => {
      const callback = args.pop();
      object[methodName](...args)
        .then(result => callback(null, result))
        .catch(error => callback(error));
    };
  }

  static map(promises, mapper) {
    return Promise.all(promises.map(mapper));
  }

  static filter(promises, predicate) {
    return Promise.all(promises.map(promise => promise.then(predicate)))
      .then(results => promises.filter((_, i) => results[i]));
  }

  static reduce(promises, reducer, initialValue) {
    return promises.reduce((promise, nextValue) => {
      return promise.then(reducer.bind(null, initialValue, nextValue));
    }, Promise.resolve(initialValue));
  }

  static waterfall(tasks, initialValue) {
    return tasks.reduce((promise, task) => {
      return promise.then(task);
    }, Promise.resolve(initialValue));
  }

  static retry(func, options) {
    const maxAttempts = options.maxAttempts || 3;
    const delay = options.delay || 1000;

    return new Promise((resolve, reject) => {
      const attempt = attemptCount => {
        func()
          .then(resolve)
          .catch(error => {
            if (attemptCount >= maxAttempts) {
              return reject(error);
            }
            PromiseUtils.delay(delay).then(() => attempt(attemptCount + 1));
          });
      };

      attempt(1);
    });
  }

  static timeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Promise timed out')), ms)
      )
    ]);
  }

  static sequence(tasks) {
    return tasks.reduce((promise, task) => {
      return promise.then(results => {
        return task().then(result => results.concat(result));
      });
    }, Promise.resolve([]));
  }
 }
 
module.exports = PromiseUtils;