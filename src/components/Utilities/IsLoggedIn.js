import Cookies from 'universal-cookie';
const cookies = new Cookies();
const isLoggedIn = () => {
    if (cookies.get('token') != null)
        return true;

    return false;
};
export default isLoggedIn;