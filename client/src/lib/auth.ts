async function logOut() {
	try {
		let res = await fetch("/api/auth/logout", {
			method: "POST",
			credentials: "include",
		})

		console.log(res.status);
	} catch { }
}


export { logOut }
