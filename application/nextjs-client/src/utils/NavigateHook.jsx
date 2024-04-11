import { useRouter } from 'next/router';

const useNavigation = () => {
  const router = useRouter();
  
  const navigateTo = (route) => {
    router.push(route);
  };

  return { navigateTo };
};

export default useNavigation;