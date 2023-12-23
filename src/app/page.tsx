'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { decrypt, encrypt } from '@/utils/crypto2'
import { useCallback, useEffect, useState } from 'react'

export default function Home() {
	const [inputText, setInputText] = useState('')
	const [decryptedText, setDecryptedText] = useState('')
	const [mounted, setMounted] = useState(false)
	const [change, setChange] = useState({ number: 0, char: 0 })

	const handleDecrypt = useCallback(() => {
		const decrypted = decrypt(inputText, change.number, change.char)
		setDecryptedText(decrypted)
	}, [change.char, change.number, inputText])

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
				<div className="grid grid-cols-2 gap-x-4">
					<h2 className="font-semibold text-white">Mudar letra a cada</h2>
					<h2 className="font-semibold text-white">Mudar número a cada</h2>
				</div>
				<div className="grid grid-cols-2 gap-x-4">
					<div className="grid grid-cols-5 gap-2 text-center">
						{numbers.map((number) => (
							<button
								key={number}
								className={cn(
									'flex h-9 w-9 items-center justify-center rounded border-2 border-zinc-500 transition-all hover:bg-zinc-600',
									change.char === number && 'bg-zinc-600',
								)}
								onClick={() =>
									setChange((ch) => ({ ...ch, char: number }))
								}
							>
								<span className="text-white">{number}</span>
							</button>
						))}
					</div>
					<div className="grid grid-cols-5 gap-2 text-center">
						{numbers.map((number) => (
							<button
								key={number}
								className={cn(
									'flex h-9 w-9 items-center justify-center rounded border-2 border-zinc-500 transition-all hover:bg-zinc-600',
									change.number === number && 'bg-zinc-600',
								)}
								onClick={() => setChange((ch) => ({ ...ch, number }))}
							>
								<span className="text-white">{number}</span>
							</button>
						))}
					</div>
				</div>
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
								{encrypt(inputText, change.number, change.char)}
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
