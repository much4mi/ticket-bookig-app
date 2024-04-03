import { Link } from 'react-router-dom';
import SignOutButton from '../SignOutButton';

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font tracking-light">
          <Link to="/">AFCON 2027</Link>
        </span>
        <div className="flex space-x-2">
          <span className="text-white">
            <Link to="/mybooking" className="flex-item-center text-black px-3 font-bold hover:bg-blue-600">My Booking</Link>
            <Link to="/stadium" className="flex-item-center text-black px-3 font-bold hover:bg-blue-600">Stadium</Link>
            <SignOutButton />
          </span>
          <span className="text-white">
            <Link to="/signin" className="flex-item-center text-black px-3 font-bold hover:bg-blue-600">Sign In</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;

