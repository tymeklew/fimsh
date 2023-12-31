import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, SignUp, Login, Me } from './pages/index'
import { Navbar } from './components/index'
import "./pages/style.css"
import { AuthContext } from './user'
import { useContext, useEffect } from 'react'

function App() {

	const auth = useContext(AuthContext);

	useEffect(() => {
		loadUser().then(() => console.log("Attempted"));
	}, [])

	async function loadUser() {
		try {
			let res = await fetch("/api/account/me", {
				credentials: "include"
			});

			if (res.status == 200) {
				console.info("Logged in ");
				let body = await res.json();
				auth.setUser({ id: body.id, username: body.username });
			}
		} catch { }
	}


	return (
		<BrowserRouter>
			<Navbar />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/me" element={<Me />} />
				</Routes>
			</main>
		</BrowserRouter>
	)
}

export default App
