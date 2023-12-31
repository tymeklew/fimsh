import { useState } from "react";
import { Markdown } from "../../components";

export default function Home() {
	const [content, setContent] = useState('');

	return <div> <Markdown content={content} setContent={setContent} /> </div>
}
