import React, { useState } from "react";
import "./style.css"

export default function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return <div className="form-container">
		<form className="form login-form" onSubmit={handleSubmit}>
			<h1> Login </h1>
			<input
				type="text"
				placeholder="Email"
				className="form-input"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				className="form-input"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type="submit" className="form-submit"> Sign Up </button>
		</form>
	</div>
}
