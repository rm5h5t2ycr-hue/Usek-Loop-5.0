import './globals.css'

export const metadata = {
  title: 'USEK Campus Hub',
  description: 'Holy Spirit University of Kaslik Campus Hub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
