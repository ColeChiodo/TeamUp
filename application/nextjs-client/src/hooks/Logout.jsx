import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const useLogout = () => {
    const domain=process.env.NEXT_PUBLIC_API_URL;
    const version=process.env.NEXT_PUBLIC_API_VERSION;
    const url = `${domain}${version}`;

    const router = useRouter();

    const logout = () => {
        fetch(`${url}/auth/logout`, {
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