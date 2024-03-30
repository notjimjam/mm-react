export const MMButton = ({children, clickFunction, extraClass}) => {
	const [wasJustClicked, setWasJustClicked] = useState(false);
	
	return (
		<button
			onClick={clickFunction}
			onMouseDown={e => setWasJustClicked(true)}
			onMouseUp={e => setWasJustClicked(false)}
			onMouseLeave={e => setWasJustClicked(false)}
			className={`button ${wasJustClicked ? 'clicked' : ''} ${extraClass ? extraClass : ''}`}
		>
			{children}
		</button>
	)
}
