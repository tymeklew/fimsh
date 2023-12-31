import React, { useContext, useState } from "react"
import { AuthContext } from "../../user";

export default function Login() {
	const [detail, setDetail] = useState('')
	const [password, setPassword] = useState('');

	const auth = useContext(AuthContext)

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		let res = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify({ detail, password }),
			headers: {
				"Content-Type": "application/json"
			}
		});

		res = await fetch("/api/account/me", {
			credentials: "include"
		});

		let body = await res.json();


		auth.setUser({
			id: body.id,
			username: body.username
		});
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
			/>
			<input
				type="password"
				placeholder="Password"
				className="form-input"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit" className="form-submit"> Login </button>
		</form>
	</div>
}
