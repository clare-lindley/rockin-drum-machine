import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import App from './components/App'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rockin Drum Machine',
  description: 'My Sandbox/Work In Progress/Personal Development App',
}

/**
 *
 * Is this an acceptable pattern for syncing?
 * How is RootLayout called and what are the children props?
 * BAD SMELL - Layout.... why does it care about sync
 *
 * I want the syncing logic to persist across the entire application but it
 * seems wrong to do this... needs more investigation!
 */
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
