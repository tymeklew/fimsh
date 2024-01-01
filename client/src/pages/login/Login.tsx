import React, { useContext, useState } from "react"
import { AuthContext } from "../../user";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
	const [detail, setDetail] = useState('')
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const auth = useContext(AuthContext)
	const navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		setError("");
		e.preventDefault();

		let res = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify({ detail, password }),
			headers: {
				"Content-Type": "application/json"
			}
		});

		switch (res.status) {
			case 200:
				res = await fetch("/api/account/me", {
					credentials: "include"
				});
				auth.setUser(await res.json());
				navigate("/login")
				break;
			case 401:
				setError("Password was incorrect or account could not be found")
				break;
			case 500:
				setError("Something went wrong please try again later");
				break;
		}


	}

	return <div className="form-container">
		<form className="form login-form" onSubmit={handleSubmit}>
			<h1> Login </h1>
			<input
				type="text"
				placeholder="Username or email"
				className="form-input"
				value={detail}
				onChange={(e) => setDetail(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				className="form-input"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<span>
				<Link to="/reset/new"> Forgot your Password? </Link> <Link to="/signup"> Don't have an account? </Link>
			</span>
			<button type="submit" className="form-submit"> Login </button>
			<p className="error"> {error}</p>
		</form>
	</div>
}
