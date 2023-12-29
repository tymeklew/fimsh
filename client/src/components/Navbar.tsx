import { Link } from 'react-router-dom'
import './style.css'
export default function Navbar() {
	return <nav className="navbar">
		<div className="navbar-title">
			<h1> Fimsh </h1>
		</div>

		<ul className="navbar-links">
			<Link to='/'> Home </Link>
			<Link to='/login'> Login </Link>
			<Link to='/signup'> Sign Up </Link>
		</ul>
	</nav>
}
