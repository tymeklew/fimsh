import React from "react"

export default function Markdown(props: {
	content: string,
	setContent: React.Dispatch<React.SetStateAction<string>>
}) {

	function handleChange(e: React.ChangeEvent<HTMLDivElement>) {
		props.setContent(e.target.innerText);
		console.log(props.content);
		console.log("Meow");
	}

	return <div>
		<div contentEditable={true} onChange={handleChange}>
			<h1> Hello </h1>
		</div>
	</div>
}
