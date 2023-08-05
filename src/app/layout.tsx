import './globals.css'
import { beon, cornerStone, kodomo, pacifico, riipop, yasashisa } from '../../public/fonts/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={`
        ${cornerStone.variable} 
        ${beon.variable} 
        ${pacifico.variable} 
        ${kodomo.variable}
        ${riipop.variable}
        ${yasashisa.variable}
      `}>{children}</body>
    </html>
  )
}
