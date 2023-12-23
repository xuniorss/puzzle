'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { decrypt, encrypt } from '@/utils/crypto2'
import { useCallback, useEffect, useState } from 'react'

export default function Home() {
	const [inputText, setInputText] = useState('')
	const [decryptedText, setDecryptedText] = useState('')
	const [mounted, setMounted] = useState(false)

	const handleDecrypt = useCallback(() => {
		const decrypted = decrypt(inputText, 3, 5)
		setDecryptedText(decrypted)
	}, [inputText])

	useEffect(() => {
		if (inputText === '' || inputText.length <= 0) setDecryptedText('')
	}, [inputText])

	useEffect(() => {
		setMounted(true)
	}, [])

	const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	if (!mounted) return null

	return (
		<section className="flex h-full w-full flex-col items-center justify-center">
			<div className="w-full max-w-screen-sm space-y-4">
				{numbers.map((n) => (
					<div key={n}>
						<span>{n}</span>
					</div>
				))}
				<div className="flex gap-x-3">
					<Input
						type="text"
						value={inputText}
						onChange={(ev) => setInputText(ev.target.value)}
					/>

					<Button onClick={handleDecrypt}>Decrypt</Button>
				</div>

				<section className="grid grid-cols-2 gap-x-4">
					<div className="rounded-md border-2 border-blue-500">
						<div className="m-2">
							<h2 className="font-bold text-blue-400">Encrypted</h2>

							<p className="break-words text-white">
								{encrypt(inputText, 3, 5)}
							</p>
						</div>
					</div>
					<div className="rounded-md border-2 border-emerald-500">
						<div className="m-2">
							<h2 className="font-bold text-emerald-400">Decrypted</h2>
							<p className="break-words text-white">{decryptedText}</p>
						</div>
					</div>
				</section>
			</div>
		</section>
	)
}
