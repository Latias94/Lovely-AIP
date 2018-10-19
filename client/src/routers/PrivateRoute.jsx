/* The following code refers to [Protected routes and authentication with React Router v4](https://tylermcginnis.com/react-router-protected-routes-authentication/) */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
	<Route
		{...rest}
		render={props => (authed
			? <Component {...props} />
			: <Redirect to={{ pathname: '/login', state: { from: props.location.state } }} />)} />
);

export default PrivateRoute;
