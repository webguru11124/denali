import { logger } from 'app/utils';
import CryptoJS from 'crypto-js';

const decryptAES = (key: string, cipherText: string): string | undefined => {
  try {
    const encryptedJson = JSON.parse(window.atob(cipherText));
    const parsedKey = CryptoJS.enc.Utf8.parse(key);

    const decrypted = CryptoJS.AES.decrypt(encryptedJson.value, parsedKey, {
      iv: CryptoJS.enc.Base64.parse(encryptedJson.iv),
      mode: CryptoJS.mode.CBC,
    });

    const readableString = decrypted.toString(CryptoJS.enc.Utf8);

    return readableString;
  } catch (error) {
    logger.error(
      `Failed to decrypt AES cipher - KEY: ${key} ; text: ${cipherText}`,
      error
    );
    return undefined;
  }
};

export default decryptAES;
