import { Link } from 'react-router-dom';

function NavbarLanding() {
	return (
		<div className="navbar navbar-expand-sm navbar-light">
      <div className="container">
          <ul className="navbar-nav ms-auto"> 
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/posts">Posts</Link></li>
          </ul>
      </div>
  </div>
	)
}

export default NavbarLanding;