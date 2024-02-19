import React, { useState, useEffect } from "react";
import { verify } from "jsonwebtoken";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
	useLoginMutation,
	MeDocument,
	MeQuery,
} from "../../../generated/graphql";
import { setAccessToken } from "../../../accessToken";
import { toastify } from "../../../components/Toastify";
import LogInForm from "../components";

const LogInActions: React.FC<RouteComponentProps> = ({ history }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isCheckRemember, setRemember] = React.useState(true);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;
	const [login] = useLoginMutation();

	useEffect(() => {
		if (!!localStorage.getItem('ptRemember') && isCheckRemember) {
			verify(
				localStorage.getItem('ptRemember'),
				`${process.env.REACT_APP_REMEMBER}`,
				(err: any, decoded: any) => {
					if (err) localStorage.getItem('ptRemember');
					if (decoded) {
						setRemember(true);

						if (!email && !password) {
							setFormData({ email: decoded.email, password: "dummypassword" });
						}
					}
				}
			);
		}
	}, []);

	useEffect(() => {
		const isRemember = localStorage.getItem('isRememberSet');
		if (password === "dummypassword" && isRemember == "true") {
			handleSubmit();
		}
	}, [formData])

	const handleFields = (
		name: string,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		event.preventDefault();
		setFormData({ ...formData, [name]: event.target.value });
	};

	const handleSubmit = async () => {
		const validateEmail = new RegExp(
			/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
		).test(email);

		if ((!email || !password) && !!!localStorage.getItem('ptRemember'))
			return toastify(400, `Please fill in all fields!`);

		if (!validateEmail) return toastify(400, `Invalid email!`);

		try {
			const response = await login({
				variables: {
					email: email,
					password: password,
					isRememberActive: isCheckRemember,
				},
				update: (store, { data }) => {
					if (!data) {
						return toastify(400, `Forbidden!`);
					}

					store.writeQuery<MeQuery>({
						query: MeDocument,
						data: {
							me: data.login.user,
						},
					});
				},
			});

			if (response && response.data) {
				setAccessToken(response.data.login.accessToken);

				if (!isCheckRemember) {
					localStorage.setItem("ptRemember", "");
					localStorage.setItem("isRememberSet", "false");
				} else {
					localStorage.setItem('ptRemember', `${response.data.login.rememberMeToken}`);
					localStorage.setItem("isRememberSet", "true");
				}

				history.push("/pages");
				return toastify(200, `Welcome ${email}!`);
			}
		} catch (error) {
			return toastify(400, `Graphql error`);
		}
	};

	return (
		<LogInForm
			showPassword={showPassword}
			formData={formData}
			handleSubmit={handleSubmit}
			handleFields={handleFields}
			setShowPassword={setShowPassword}
			isCheckRemember={isCheckRemember}
			setRemember={setRemember}
		/>
	);
};

export default withRouter(LogInActions);
