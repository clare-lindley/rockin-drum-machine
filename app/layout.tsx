import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import App from './components/App'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rockin Drum Machine',
  description: 'My Sandbox/Work In Progress/Personal Development App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App />
        {children} 
      </body>
    </html>
  )
}
