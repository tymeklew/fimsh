import { useContext, useEffect } from "react"
import { AuthContext } from "../../user"
import { useNavigate } from "react-router-dom"

export default function Me() {
	const { user } = useContext(AuthContext)
	const navigate = useNavigate();

	useEffect(() => {
		console.log(user);
		if (!user) {
			navigate("/login");
		}
	}, [])

	return <div> {user == null ? <> </> : <div> {user.id} : {user.username} </div>} </div>
}
