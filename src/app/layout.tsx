import { cn } from '@/lib/utils'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="pt-BR">
			<body
				className={cn(
					'bg-secondary-foreground/95 antialiased',
					font.className,
				)}
			>
				{children}
			</body>
		</html>
	)
}
