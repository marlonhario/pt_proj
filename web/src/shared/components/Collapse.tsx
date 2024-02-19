import React from 'react';
import { Collapse } from 'reactstrap';
import MinusIcon from 'mdi-react/MinusIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';


export const CollapseComponent = (props: any) => {

	const [state, setState] = React.useState<any>({
		collapse: props.open ? true : false,
		status: 'closed',
		icon: <PlusIcon />,
	});

	const onEntering = () => {
		setState({ ...state, status: 'opening', icon: <MinusIcon /> });
	};

	const onEntered = () => {
		setState({ ...state, status: 'opened', icon: <MinusIcon /> });
	};

	const onExiting = () => {
		setState({ ...state, status: 'closing', icon: <PlusIcon /> });
	};

	const onExited = () => {
		setState({ ...state, status: 'closed', icon: <PlusIcon /> });
	};

	const toggle = () => {
		setState(prevState => ({ collapse: !prevState.collapse }));
	};

	const { className, title, children } = props;
	const { icon, collapse, status } = state;

	return (
		<div className={`collapse__wrapper ${status} ${className}`} dir="ltr">
			<button onClick={toggle} className="collapse__title" type="button">
				{icon}
				{title}
				<p><ChevronDownIcon /></p>
			</button>
			<Collapse
				isOpen={collapse}
				className="collapse__content"
				onEntering={onEntering}
				onEntered={onEntered}
				onExiting={onExiting}
				onExited={onExited}
			>
				<div>
					{children}
				</div>
			</Collapse>
		</div>
	);
}
