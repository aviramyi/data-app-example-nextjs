import Footer from "./footer";
import Header from "./header";
import Filters from "./filters";

// This is our base page layout - See it is used in pages_app.js
export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <Filters />
      <main className="container">
        {children}
      </main>
      <Footer />
    </div>
  )
}