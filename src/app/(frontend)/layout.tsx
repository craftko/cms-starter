import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './styles.css'

export const metadata: Metadata = {
  title: 'CMS Starter',
  description: 'Secure, minimal headless CMS for small business websites.',
}

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
