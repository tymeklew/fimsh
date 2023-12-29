import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, SignUp } from './pages/index'
import { Navbar } from './components/index'
import "./pages/style.css"

function App() {

	return (
		<BrowserRouter>
			<Navbar />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
			</main>
		</BrowserRouter>
	)
}

export default App
