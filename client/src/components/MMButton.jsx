/**
 * '@/components/MMButton.jsx'
 * In components or pages:
 *  <MMButton
 * 	    clickFunction={ }
 * 		extraClass=''
 * 	>
 * 		text
 * 	</MMButton>
 *
 * Built a customized button to replace <button> tags
 * Contains a clickFunction, extraClass, and children
 *
 * @param {children} - acts as a slot to display text or icons within the button
 * @param {clickFunction} - the function to be executed on click
 * @param {extraClass} - additional classes to be added to the button
 * for styles and button sizing
 *
 * @returns {JSX.Element}
 */
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
