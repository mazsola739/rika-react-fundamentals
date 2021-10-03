import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { Link, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { userLogout } from 'store/user/actionCreators';
import axios from 'axios';

const Header = ({ store }) => {
	const dispatch = useDispatch();
	const user = store.getState().user;

	const token = localStorage.getItem('token');

	const apiService = axios.create({
		baseURL: 'http://localhost:3000',
		headers: { 'Content-type': 'application/json', Authorization: token },
	});

	const fetchData = async (token) => await apiService.delete('/logout', token);

	const logoutSubmit = () => {
		localStorage.removeItem('token');
		dispatch(userLogout());
		<Redirect to='/login' />;
		fetchData();
	};

	return (
		<div className='container alert alert-secondary border border-dark border-1 rounded-1'>
			<div className='row'>
				<div className='col fa fa-laptop' style={{ fontSize: '48px' }}>
					Courses
				</div>
				{user.isAuth ? (
					<div className='row col-sm-5 d-flex justify-content-end align-items-center'>
						<div className='col bg-info btn bg-opacity-25 rounded-1'>
							{user.name}
						</div>
						<div className='col d-flex justify-content-end'>
							<Link to='/login'>
								<Button
									text='Logout'
									clickHandler={logoutSubmit}
									icon={undefined}
								/>
							</Link>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

Header.propTypes = {
	store: PropTypes.object,
};

// @ts-ignore
export default connect(({ user }) => ({
	user,
	// @ts-ignore
}))(Header);
