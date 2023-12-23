'use client'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { decrypt, encrypt } from '@/utils/crypto2'
import { CaseLower, CaseUpper } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Home() {
	const [inputText, setInputText] = useState('')
	const [mounted, setMounted] = useState(false)
	const [change, setChange] = useState({ number: 0, char: 0 })
	const [isDecrypted, setIsDecrypted] = useState(false)
	const [isLowerCase, setIsLowerCase] = useState(true)

	const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	useEffect(() => {
		const sensitive = (ev: KeyboardEvent) => {
			if (ev.getModifierState('CapsLock')) setIsLowerCase(false)
			else setIsLowerCase(true)
		}

		window.addEventListener('keydown', sensitive)

		return () => window.removeEventListener('keydown', sensitive)
	}, [setIsLowerCase])

	useEffect(() => {
		setInputText('')
	}, [isDecrypted])

	useEffect(() => {
		setMounted(true)
	}, [])

	const copyToClipboard = useCallback(async (text: string) => {
		try {
			await navigator.clipboard.writeText(text)
			toast('Copiado para área de transferência')
		} catch (error) {
			console.error(error)
		}
	}, [])

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

					<span className="rounded border-2 border-gray-500 p-1">
						{!isLowerCase && <CaseUpper color="white" />}
						{isLowerCase && <CaseLower color="white" />}
					</span>
				</div>

				<section>
					{!isDecrypted && inputText.length > 0 && (
						<button
							className="w-full rounded-md border-2 border-blue-500 hover:bg-blue-500/40"
							onClick={() =>
								copyToClipboard(
									encrypt(inputText, change.number, change.char),
								)
							}
						>
							<div className="m-2">
								<p className="select-none break-words text-center font-bold text-blue-500">
									{encrypt(inputText, change.number, change.char)}
								</p>
							</div>
						</button>
					)}
					{isDecrypted && inputText.length > 0 && (
						<button
							className="w-full rounded-md border-2 border-emerald-500 hover:bg-emerald-500/40"
							onClick={() =>
								copyToClipboard(
									decrypt(inputText, change.number, change.char),
								)
							}
						>
							<div className="m-2">
								<p className="select-none break-words text-center font-bold text-emerald-500">
									{decrypt(inputText, change.number, change.char)}
								</p>
							</div>
						</button>
					)}
				</section>
			</div>
		</section>
	)
}
