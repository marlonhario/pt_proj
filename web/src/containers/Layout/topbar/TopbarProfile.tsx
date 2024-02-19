import React from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import { useLogoutMutation, useMeQuery } from "../../../generated/graphql";
import { setAccessToken } from "../../../accessToken";
import { Link } from 'react-router-dom';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

const TopbarProfile: React.FC = () => {
	const { data, loading } = useMeQuery();
	const [collapse, setCollapse] = React.useState(false);
	const [logout, { client }] = useLogoutMutation();

	let name: string = "";
	let is_picture: string = "";

	if (data && data.me) {
		let is_first = data.me.first_name;
		let is_last = data.me.last_name;
		let pic = data.me.profile_image;

		if (pic) {
			is_picture = process.env.REACT_APP_HOST + '/images/' + pic;
		}

		if (is_first || is_last) {
			name = is_first + " " + is_last;
		}
	}

	let profile = is_picture ? is_picture : Ava;

	return (
		<div className="topbar__profile">
			<button type="button" className="topbar__avatar" onClick={() => setCollapse(!collapse)}>
				<img className="topbar__avatar-img" src={profile} alt="avatar" />
				<p className="topbar__avatar-name">{name}</p>
				<DownIcon className="topbar__icon" />
			</button>
			{collapse && <button type="button" className="topbar__back" onClick={() => setCollapse(!collapse)} />}
			<Collapse isOpen={collapse} className="topbar__menu-wrap">
				<div className="topbar__menu">
					<TopbarMenuLink title="Account" icon="user" path="/accounts/view" />
					<TopbarMenuLink title="Change password" icon="user" path="/reset_password" />
					<div className="topbar__menu-divider" />
					<Link
						className="topbar__link"
						to="/"
						onClick={async () => {
							await logout();
							setAccessToken("");
							localStorage.setItem("isRememberSet", "false");
							await client!.resetStore();
						}}
					>
						<span className={`topbar__link-icon lnr lnr-exit`} />
						<p className="topbar__link-title">Log Out</p>
					</Link>
				</div>
			</Collapse>
		</div>
	);
}

export default TopbarProfile;