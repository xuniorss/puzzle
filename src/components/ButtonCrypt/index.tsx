import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
	base: 'w-full rounded-md border-2',
	variants: {
		color: {
			blue: 'border-blue-500 hover:bg-blue-500/40',
			emerald: 'border-emerald-500 hover:bg-emerald-500/40',
		},
	},
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const ButtonCrypt = ({ color, className, ...props }: ButtonProps) => {
	return (
		<button className={button({ color, className })} {...props}>
			{props.children}
		</button>
	)
}
