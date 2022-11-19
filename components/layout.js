import Footer from "./footer";
import Header from "./header";

// This is our base page layout - See it is used in pages_app.js
export default function Layout({ children }) {
  return (
    <div>
      <main className="container">
        <Header />
        {children}
      </main>
      <Footer />
    </div>
  )
}