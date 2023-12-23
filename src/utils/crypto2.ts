const encryptChar = (
	char: string,
	changeNumber: number,
	changeChar: number,
): string => {
	if (char >= 'a' && char <= 'z')
		return String.fromCharCode(
			((char.charCodeAt(0) - 97 + changeChar) % 26) + 97,
		)
	else if (char >= 'A' && char <= 'Z')
		return String.fromCharCode(
			((char.charCodeAt(0) - 65 + changeChar) % 26) + 65,
		)
	else if (char >= '0' && char <= '9')
		return String.fromCharCode(
			((char.charCodeAt(0) - 48 + changeNumber) % 10) + 48,
		)
	return char
}

const decryptChar = (
	char: string,
	changeNumber: number,
	changeChar: number,
): string => {
	if (char >= 'a' && char <= 'z')
		return String.fromCharCode(
			((char.charCodeAt(0) - 97 - changeChar + 26) % 26) + 97,
		)
	else if (char >= 'A' && char <= 'Z')
		return String.fromCharCode(
			((char.charCodeAt(0) - 65 - changeChar + 26) % 26) + 65,
		)
	else if (char >= '0' && char <= '9')
		return String.fromCharCode(
			((char.charCodeAt(0) - 48 - changeNumber + 10) % 10) + 48,
		)
	return char
}

export const encrypt = (
	text: string,
	changeNumber: number,
	changeChar: number,
): string =>
	text
		.split('')
		.map((char) => encryptChar(char, changeNumber, changeChar))
		.join('')

export const decrypt = (
	text: string,
	changeNumber: number,
	changeChar: number,
): string =>
	text
		.split('')
		.map((char) => decryptChar(char, changeNumber, changeChar))
		.join('')
