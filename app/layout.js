'use client'
import '@/styles/globals.css'
import Header from '@/component/Header'
import Footer from '@/component/Footer'
import PageTransition from '@/component/PageTransition'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Skatt</title>
      <body>
        <div>
          <header>
            <Header />
          </header>
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <footer>
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  )
}
