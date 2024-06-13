'use client'
import '@/styles/globals.css'
import Header from '@/component/Header'
import Footer from '@/component/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Skatt</title>
      <body>
        <div>
          <header>
            <Header />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  )
}
