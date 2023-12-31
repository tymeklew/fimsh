import { ReactNode, createContext, useState } from "react";
import React from "react";


type User = {
	id: String,
	username: String
}

export const AuthContext = createContext<{ user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>> }>({
	user: null,
	setUser: () => { },
})

const AuthProvider = (props: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	return (
		<AuthContext.Provider value={{ user: user, setUser: setUser }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
