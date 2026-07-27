import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout({ children }) {

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {children}

      </main>

      <Footer />

    </>
  );
}

export default MainLayout;