import { loginThunk, logoutThunk } from './thunk';

export const userLogin = (userData) => loginThunk(userData);
export const userLogout = () => logoutThunk();
