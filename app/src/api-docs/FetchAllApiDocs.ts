import fs from 'fs';
import path from 'path';

class FetchAllApiDocs {
  rootDir: string;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
    this.listFiles(this.rootDir, []);
  }

  private listFiles(dirPath: string, filesArray: string[]) {
    try {
      const files = fs.readdirSync(dirPath);

      let arrayOfFiles: string[] = filesArray || [];

      files.forEach((file) => {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
          arrayOfFiles =
            this.listFiles(dirPath + '/' + file, arrayOfFiles) || [];
        } else {
          arrayOfFiles.push(path.join(__dirname, dirPath, '/', file));
        }
      });
      console.log(arrayOfFiles);
      return arrayOfFiles;
    } catch (e) {
      console.log(e);
    }
  }

  public schemas(): string[] {
    return ['hello'];
  }

  public paths(): [] {
    return [];
  }
}

export default new FetchAllApiDocs('./src/services');
