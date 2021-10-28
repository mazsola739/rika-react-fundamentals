import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import Logo from './components/Logo/Logo';
import { Button } from 'common';
import { userLogout } from 'store/user/actionCreators';
import { LOGOUT } from '../../utils/constants';

const Header = ({ user }) => {
	const dispatch = useDispatch();

	const logoutSubmit = () => {
		dispatch(userLogout());
	};

	return (
		<div className='container alert alert-info border border-dark border-1 rounded-1'>
			<div className='row'>
				<Logo />
				{user.isAuth ? (
					<div className='row col-sm-5 d-flex justify-content-end align-items-center'>
						<div data-testid='name' className='col btn bg-info rounded-1'>
							{user.name}
						</div>
						<div className='col d-flex justify-content-end'>
							<Link to='/login'>
								<Button
									text={LOGOUT}
									clickHandler={logoutSubmit}
									icon={undefined}
								/>
							</Link>
						</div>
					</div>
				) : (
					<Redirect to='/login' />
				)}
			</div>
		</div>
	);
};

Header.propTypes = {
	user: PropTypes.object,
};
// @ts-ignore
export default connect(({ user }) => ({
	user,
}))(Header);
