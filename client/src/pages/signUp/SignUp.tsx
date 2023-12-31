import React, { useState } from "react";
import { redirect } from "react-router-dom";

export default function SignUp() {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		let res = await fetch("/api/auth/signup", {
			method: "POST",
			body: JSON.stringify({ email, username, password }),
			headers: {
				"Content-Type": "application/json"
			}
		})

		console.log(res.status);

		switch (res.status) {
			case 201: return redirect("/login")
		}

	}

	return <div className="form-container">
		<form className="form signup-form" onSubmit={handleSubmit}>
			<h1> Sign Up </h1>
			<input
				type="text"
				placeholder="Email"
				className="form-input email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="text"
				placeholder="Username"
				className="form-input"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
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
			<button type="submit" className="form-submit"> Sign Up </button>
		</form>
	</div>
}
