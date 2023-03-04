class ErrorHandler {
  static throw(errorMessage) {
    throw new Error(errorMessage);
  }

  static throwIf(condition, errorMessage) {
    if (condition) {
      throw new Error(errorMessage);
    }
  }

  static throwUnless(condition, errorMessage) {
    if (!condition) {
      throw new Error(errorMessage);
    }
  }

  static tryCatch(tryBlock, catchBlock) {
    try {
      tryBlock();
    } catch (error) {
      catchBlock(error);
    }
  }

  static async tryCatchAsync(tryBlock, catchBlock) {
    try {
      await tryBlock();
    } catch (error) {
      catchBlock(error);
    }
  }

  static logAndThrow(errorMessage) {
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  static logAndThrowIf(condition, errorMessage) {
    if (condition) {
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  static logAndThrowUnless(condition, errorMessage) {
    if (!condition) {
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  static logAndRethrow(errorMessage, error) {
    console.error(errorMessage, error);
    throw error;
  }

  static logAndRethrowIf(condition, errorMessage, error) {
    if (condition) {
      console.error(errorMessage, error);
      throw error;
    }
  }

  static logAndRethrowUnless(condition, errorMessage, error) {
    if (!condition) {
      console.error(errorMessage, error);
      throw error;
    }
  }

  static logError(error) {
    console.error(error);
  }

  static logWarning(warning) {
    console.warn(warning);
  }

  static async wrapAsync(fn) {
    try {
      const result = await fn();
      return [result, null];
    } catch (error) {
      return [null, error];
    }
  }

  static wrap(fn) {
    try {
      const result = fn();
      return [result, null];
    } catch (error) {
      return [null, error];
    }
  }

  static throwIfEmpty(array, errorMessage) {
    if (array.length === 0) {
      throw new Error(errorMessage);
    }
  }

  static throwUnlessEmpty(array, errorMessage) {
    if (array.length !== 0) {
      throw new Error(errorMessage);
    }
  }

  static throwIfNull(value, errorMessage) {
    if (value === null) {
      throw new Error(errorMessage);
    }
  }

  static throwUnlessNull(value, errorMessage) {
    if (value !== null) {
      throw new Error(errorMessage);
    }
  }

  static throwIfUndefined(value, errorMessage) {
    if (value === undefined) {
      throw new Error(errorMessage);
    }
  }

  static throwUnlessUndefined(value, errorMessage) {
    if (value !== undefined) {
      throw new Error(errorMessage);
    }
  }

  static throwIfNotObject(value, errorMessage) {
    if (typeof value !== 'object') {
      throw new Error(errorMessage);
    }
  }

  static throwUnlessFunction(value, errorMessage) {
    if (typeof value !== 'function') {
      throw new Error(errorMessage);
    }
  }
}

module.exports = ErrorHandler;