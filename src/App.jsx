import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/Courses';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import rootReducer from './store/index';
import { fetchAuthors } from './store/authors/actionCreators';
import { fetchCourses } from './store/courses/actionCreators';
import { getApiService } from 'components/ApiService';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, composedEnhancer);

const App = () => {
	//! ez hova kell const store = useSelector((store) => store);
	const dispatch = store.dispatch;

	useEffect(() => {
		const fetchAllCourses = () => {
			getApiService()
				.get(`/courses/all`)
				.then((response) => response.data)
				.then((myJson) => dispatch(fetchCourses(myJson.result)));
		};
		fetchAllCourses();
		const fetchAllAuthors = () => {
			getApiService()
				.get(`/authors/all`)
				.then((response) => response.data)
				.then((myJson) => dispatch(fetchAuthors(myJson.result)));
		};
		fetchAllAuthors();
	});

	return (
		<Provider store={store}>
			<div className='App container py-4'>
				<Router>
					<Switch>
						<Route path='/login' exact component={Login}>
							<Header store={store} />
							<Login />
						</Route>
						<Route path='/registration' exact component={Registration}>
							<Header store={store} />
							<Registration />
						</Route>
						<Route path='/courses' exact component={Courses}>
							<Header store={store} />
							<Courses store={store} />
						</Route>
						<Route path='/courses/add' exact component={CreateCourse}>
							<Header store={store} />
							<CreateCourse store={store} key={''} />
						</Route>
						<Route path='/courses/:courseId' exact component={CourseInfo}>
							<Header store={store} />
							<CourseInfo store={store} />
						</Route>
						<Route path='/'>
							{store.getState().user.isAuth ? (
								<Redirect to='/courses' />
							) : (
								<Redirect to='/login' />
							)}
						</Route>
					</Switch>
				</Router>
			</div>
		</Provider>
	);
};

App.propTypes = {
	store: PropTypes.object,
};

export default App;
