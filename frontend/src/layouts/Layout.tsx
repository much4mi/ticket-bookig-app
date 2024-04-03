import Header from "../components/Header";
import Hero from "../components/Heros"; // Corrected import statement for Hero component
import Footer from "../components/Footer";

interface Props {
  children: React.ReactNode; // Corrected prop name to 'children'
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-0 py-10 flex-1">{children}</div> {/* Render children */}
      <Footer />
    </div>
  );
};

export default Layout;
