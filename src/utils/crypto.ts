import CryptoJS from 'crypto-js'

export const encrypt = (text: string): string => {
   const ciphertext = CryptoJS.AES.encrypt(text, 'secret-key').toString()
   return ciphertext
}

export const decrypt = (ciphertext: string): string => {
   const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret-key')
   const originalText = bytes.toString(CryptoJS.enc.Utf8)
   return originalText
}
