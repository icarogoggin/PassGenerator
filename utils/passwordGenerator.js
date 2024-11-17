/**
 * Gera uma senha segura com base nas opções fornecidas.
 * @param {number} length - O comprimento da senha.
 * @param {Object} options - Opções de caracteres.
 * @param {boolean} options.uppercase - Inclui letras maiúsculas.
 * @param {boolean} options.lowercase - Inclui letras minúsculas.
 * @param {boolean} options.numbers - Inclui números.
 * @param {boolean} options.symbols - Inclui símbolos.
 * @returns {string} - A senha gerada.
 */
function generatePassword(length, options) {
    const { uppercase, lowercase, numbers, symbols } = options;
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
  
    let charSet = '';
    if (uppercase) charSet += upperChars;
    if (lowercase) charSet += lowerChars;
    if (numbers) charSet += numberChars;
    if (symbols) charSet += symbolChars;
  
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return password;
  }
  
  module.exports = generatePassword;
  