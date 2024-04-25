import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const useLogout = () => {
    const router = useRouter();

    const logout = () => {
        fetch("http://localhost:3000/v1/auth/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refreshToken: Cookies.get('refreshToken')
            })
        }).then(() => {
            // delete cookies
            Cookies.remove('userData');
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            router.push('/');
        })
    };

    return logout;
};

export default useLogout;