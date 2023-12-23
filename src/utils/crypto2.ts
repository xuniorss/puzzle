const LOWERCASE_A_CODE = 'a'.charCodeAt(0)
const UPPERCASE_A_CODE = 'A'.charCodeAt(0)
const ZERO_CODE = '0'.charCodeAt(0)
const ALPHABET_LENGTH = 26
const NUMBERS_LENGTH = 10

const shiftChar = (
	char: string,
	change: number,
	baseCode: number,
	length: number,
): string =>
	String.fromCharCode(
		((char.charCodeAt(0) - baseCode + change + length) % length) + baseCode,
	)

const encryptChar = (
	char: string,
	changeNumber: number = 0,
	changeChar: number = 0,
): string => {
	if (char >= 'a' && char <= 'z') {
		return shiftChar(char, changeChar, LOWERCASE_A_CODE, ALPHABET_LENGTH)
	} else if (char >= 'A' && char <= 'Z') {
		return shiftChar(char, changeChar, UPPERCASE_A_CODE, ALPHABET_LENGTH)
	} else if (char >= '0' && char <= '9') {
		return shiftChar(char, changeNumber, ZERO_CODE, NUMBERS_LENGTH)
	}
	return char
}

const decryptChar = (
	char: string,
	changeNumber: number = 0,
	changeChar: number = 0,
): string => {
	if (char >= 'a' && char <= 'z') {
		return shiftChar(char, -changeChar, LOWERCASE_A_CODE, ALPHABET_LENGTH)
	} else if (char >= 'A' && char <= 'Z') {
		return shiftChar(char, -changeChar, UPPERCASE_A_CODE, ALPHABET_LENGTH)
	} else if (char >= '0' && char <= '9') {
		return shiftChar(char, -changeNumber, ZERO_CODE, NUMBERS_LENGTH)
	}
	return char
}

export const encrypt = (
	text: string,
	changeNumber: number = 0,
	changeChar: number = 0,
): string =>
	text
		.split('')
		.map((char) => encryptChar(char, changeNumber, changeChar))
		.join('')

export const decrypt = (
	text: string,
	changeNumber: number = 0,
	changeChar: number = 0,
): string =>
	text
		.split('')
		.map((char) => decryptChar(char, changeNumber, changeChar))
		.join('')
