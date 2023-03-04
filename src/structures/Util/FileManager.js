const fs = require('fs');
const path = require('path');

class FileManager {
  constructor() {}

  async readFile(filePath) {
    return fs.promises.readFile(filePath);
  }

  async writeFile(filePath, data) {
    return fs.promises.writeFile(filePath, data);
  }

  async appendToFile(filePath, data) {
    return fs.promises.appendFile(filePath, data);
  }

  async deleteFile(filePath) {
    return fs.promises.unlink(filePath);
  }

  async createDirectory(dirPath) {
    return fs.promises.mkdir(dirPath);
  }

  async deleteDirectory(dirPath) {
    return fs.promises.rmdir(dirPath, { recursive: true });
  }

  async renameFile(oldPath, newPath) {
    return fs.promises.rename(oldPath, newPath);
  }

  async copyFile(sourcePath, destinationPath) {
    return fs.promises.copyFile(sourcePath, destinationPath);
  }

  async getFileInfo(filePath) {
    return fs.promises.stat(filePath);
  }

  async getFileSize(filePath) {
    const stats = await fs.promises.stat(filePath);
    return stats.size;
  }

  async getFileExtension(filePath) {
    return path.extname(filePath);
  }

  async listFilesInDirectory(dirPath) {
    return fs.promises.readdir(dirPath);
  }

  async createReadStream(filePath) {
    return fs.createReadStream(filePath);
  }

  async createWriteStream(filePath) {
    return fs.createWriteStream(filePath);
  }

  async createFileReadStreamAndPipeToResponse(filePath, response) {
    const readStream = await this.createReadStream(filePath);
    readStream.pipe(response);
  }

  async createFileWriteStreamAndPipeToRequest(filePath, request) {
    const writeStream = await this.createWriteStream(filePath);
    request.pipe(writeStream);
  }

  async isFile(filePath) {
    const stats = await fs.promises.stat(filePath);
    return stats.isFile();
  }

  async isDirectory(dirPath) {
    const stats = await fs.promises.stat(dirPath);
    return stats.isDirectory();
  }

  async fileExists(filePath) {
    try {
      await this.getFileInfo(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  async directoryExists(dirPath) {
    try {
      const stats = await this.getFileInfo(dirPath);
      return stats.isDirectory();
    } catch (error) {
      return false;
    }
  }

  async getFilePermissions(filePath) {
    const stats = await fs.promises.stat(filePath);
    return stats.mode.toString(8).slice(-3);
  }

  async changeFilePermissions(filePath, permissions) {
    return fs.promises.chmod(filePath, permissions);
  }

  async getFileCreationTime(filePath) {
    const stats = await fs.promises.stat(filePath);
    return stats.birthtime;
  }

  async getFileLastAccessTime(filePath) {
    const stats = await fs.promises.stat(filePath);
    return stats.atime;
  }

  async getFileLastModifiedTime(filePath) {
    const stats = await fs.promises.stat(filePath);
    return stats.mtime;
  }

  async createFileIfNotExists(filePath) {
    if (!(await this.fileExists(filePath))) {
      await this.writeFile(filePath, '');
    }
  }

  async getFileName(filePath) {
    return path.basename(filePath);
  }

  async getFileDirectoryPath(filePath) {
    return path.dirname(filePath);
  }

  async isAbsolute(filePath) {
    return path.isAbsolute(filePath);
  }

  async joinPaths(...paths) {
    return path.join(...paths);
  }

  async resolvePath(...paths) {
    return path.resolve(...paths);
  }

  async normalizePath(filePath) {
    return path.normalize(filePath);
  }
 }
 
module.exports = FileManager;