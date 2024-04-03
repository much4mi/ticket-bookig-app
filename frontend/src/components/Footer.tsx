import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">
          <h3 className="text-lg font-semibold">AFCON 2027</h3>
        </div>
        <div className="text-white flex space-x-4">
          <Link to="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-400">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
