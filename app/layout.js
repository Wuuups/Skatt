import '@/styles/globals.scss'
import Header from '@/component/Header'
import Footer from '@/component/Footer'
import { ResponsiveProvider } from '@/context/ResponsiveContext'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Skatt</title>
      <body>
        <header>
          <Header />
        </header>
        <ResponsiveProvider>
          <main>{children}</main>
        </ResponsiveProvider>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
