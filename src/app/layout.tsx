import { ReactQueryProvider } from '../context/query'
import './globals.css'

export const metadata = {
  title: 'NFT Gallery',
  description: 'NFT Gallery to see assets owned by wallet',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className='bg-white dark:bg-black'>{children}</body>
      </ReactQueryProvider>
    </html>
  )
}
