import Cryptr from 'cryptr';

class cryptString {
  private cryptStr: Cryptr;

  constructor(secret: string) {
    this.cryptStr = new Cryptr(secret);
  }

  public encryptString(string: string): string {
    return this.cryptStr.encrypt(string);
  }

  public decryptString(string: string): string {
    return this.cryptStr.decrypt(string);
  }
}

export default cryptString;
