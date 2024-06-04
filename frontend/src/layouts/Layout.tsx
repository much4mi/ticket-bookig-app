
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Heros'; 
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const location = useLocation(); 
  const isHomePage = location.pathname === "/"; 

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      {isHomePage && ( 
        <div className="container mx-auto">
          <SearchBar />
        </div>
      )}
      <div className="container mx-0 py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
