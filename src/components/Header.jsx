import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-light shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="text-decoration-none">
          <h1 className="fw-bold text-wrap">
            <span className="text-secondary">SRH</span>{' '}
            <span className="text-dark">HR</span>
          </h1>
        </Link>
        <form className="bg-white rounded d-flex align-items-center px-3 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="form-control border-0 me-2"
            style={{ boxShadow: 'none', width: '150px' }}
          />
          <FaSearch className="text-secondary" />
        </form>
        <ul className="d-flex list-unstyled gap-3 m-0">
          <li>
            <Link to="/" className="text-dark text-decoration-none d-none d-sm-inline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-dark text-decoration-none d-none d-sm-inline">
              About
            </Link>
          </li>
          <li>
            <Link to="/sign-in" className="text-dark text-decoration-none">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
