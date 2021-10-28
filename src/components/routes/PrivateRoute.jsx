import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAdmin, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAdmin() ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/courses',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
