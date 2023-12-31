import { NavLink, useNavigate } from 'react-router-dom'
import './style.css'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../user'
import { logOut } from '../lib/auth'

export default function Navbar() {
	const { user, setUser } = useContext(AuthContext);

	const navigate = useNavigate()

	async function handleLogout() {
		await logOut();
		setUser(null);
		navigate("/")
	}

	useEffect(() => {
		console.log("Updated : {}", user);
	}, [user])

	return <nav className="navbar">
		<div className="navbar-title">
			<h1> Fimsh </h1>
		</div>

		<ul className="navbar-links">
			<NavLink to='/' > Home </NavLink>
			{user != null ?
				<>
					<NavLink to='/me' > Me </NavLink>
					<p onClick={handleLogout}> Sign Out </p>
				</> :
				<>
					<NavLink to='/login'> Login </NavLink>
					<NavLink to='/signup'> Sign Up </NavLink>
				</>
			}
		</ul>
	</nav>
}
