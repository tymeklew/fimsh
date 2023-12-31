import { NavLink } from 'react-router-dom'
import './style.css'
export default function Navbar() {
	return <nav className="navbar">
		<div className="navbar-title">
			<h1> Fimsh </h1>
		</div>

		<ul className="navbar-links">
			<NavLink to='/' > Home </NavLink>
			<NavLink to='/me' > Me </NavLink>
			<NavLink to='/login'> Login </NavLink>
			<NavLink to='/signup'> Sign Up </NavLink>
		</ul>
	</nav>
}
