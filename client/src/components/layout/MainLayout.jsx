import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout({ children }) {

  return (
    <>
      <Navbar />

      <main>

        {children}

      </main>

      <Footer />

    </>
  );
}

export default MainLayout;