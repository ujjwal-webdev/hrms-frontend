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
        <ul className="d-flex list-unstyled gap-3 m-0">
          <li>
            <Link to="/" className="text-dark text-decoration-none">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
