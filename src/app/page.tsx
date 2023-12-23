'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { decrypt, encrypt } from '@/utils/crypto2'
import { ShieldOff } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export default function Home() {
	const [inputText, setInputText] = useState('')
	const [decryptedText, setDecryptedText] = useState('')
	const [mounted, setMounted] = useState(false)
	const [change, setChange] = useState({ number: 0, char: 0 })
	const [isDecrypted, setIsDecrypted] = useState(false)

	const handleDecrypt = useCallback(() => {
		const decrypted = decrypt(inputText, change.number, change.char)
		setDecryptedText(decrypted)
	}, [change.char, change.number, inputText])

	useEffect(() => {
		if (inputText === '' || inputText.length <= 0) setDecryptedText('')
	}, [inputText])

	useEffect(() => {
		setInputText('')
	}, [isDecrypted])

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
				<div className="flex items-center gap-x-3">
					<Switch
						checked={isDecrypted}
						onCheckedChange={() => setIsDecrypted((prev) => !prev)}
					/>
					<Input
						type="text"
						value={inputText}
						onChange={(ev) => setInputText(ev.target.value)}
						placeholder={isDecrypted ? 'Descriptografar' : 'Criptografar'}
					/>

					{isDecrypted && (
						<Button onClick={handleDecrypt}>
							<ShieldOff />
						</Button>
					)}
				</div>

				<section>
					{!isDecrypted && inputText.length > 0 && (
						<div className="rounded-md border-2 border-blue-500 hover:bg-blue-500/40">
							<div className="m-2">
								<p className="break-words text-center font-bold text-blue-500">
									{encrypt(inputText, change.number, change.char)}
								</p>
							</div>
						</div>
					)}
					{isDecrypted && decryptedText.length > 0 && (
						<div className="rounded-md border-2 border-emerald-500 hover:bg-emerald-500/40">
							<div className="m-2">
								<p className="break-words text-center font-bold text-emerald-500">
									{decryptedText}
								</p>
							</div>
						</div>
					)}
				</section>
			</div>
		</section>
	)
}
