import Footer from "./footer";
import Header from "./header";
import { Inter } from '@next/font/google'

// This is our base page layout - See it is used in pages_app.js

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <>
      <main className="container">
        <div id="main">
          <Header />
          {children}
        </div>
      </main >
      <Footer />
    </>)
}