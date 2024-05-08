import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLogout } from '../hooks/useLogout';
export const useAuthContext = () => {
  // const { logout } = useLogout();
  const context = useContext(AuthContext);

  return context;
};
