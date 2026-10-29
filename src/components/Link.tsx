import type { AnchorHTMLAttributes } from 'react'

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = (props: LinkProps) => <a {...props} />
