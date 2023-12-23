import { toast } from 'sonner'

export const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text)
		toast('Copiado para área de transferência')
	} catch (error) {
		console.error(error)
	}
}
