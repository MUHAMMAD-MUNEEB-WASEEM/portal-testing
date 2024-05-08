import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthHeading from '../../../components/AuthHeading/AuthHeading';
import Form from '../../../components/Form/Form';
import classes from './Login.module.css';

import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { api } from '../../../services/api';
import GradientBg from '../../../components/AuthBackground/GradientBg';
import useToast from '../../../hooks/useToast';
import { Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { Button } from '@chakra-ui/button';

const Login = () => {
  const dispatchRedux = useDispatch();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const { dispatch } = useAuthContext();
  const { showErrorToast, showSuccessToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(null);

    const payload = {
      email: userData.email,
      password: userData.password,
    };

    dispatchRedux(loginUser({ payload: payload }))
      .then((action) => {
        if (loginUser.fulfilled.match(action)) {
          if (action.payload) {
            setIsLoading(false);
            setIsError(null);
            localStorage.setItem('token', action.payload?.data?.token);
            localStorage.setItem('User', JSON.stringify(action.payload));
            dispatch({
              type: 'LOGIN',
              payload: action.payload,
            });
            showSuccessToast('Login Succesfull.');
            navigate('/dashboard/main');
            return;
          } else {
            showErrorToast('Failed to Login.');
            setIsLoading(false);
          }
        } else {
          showErrorToast('Failed to Login!');
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error:', error);
        showErrorToast(error);
      });
  };

  return (
    <div className={classes.loginContainer}>
      <GradientBg />
      <div className={classes.loginInner}>
        <Form>
          <AuthHeading
            headingTitle="Login"
            // headingText="See your growth finance here and let see your profit you get now"
          />
          <form className={classes.formGroup} onSubmit={handleSubmit}>
            {successMessage && <div className={classes.success}>{successMessage}</div>}

            <label>
              <span>Email Address</span>
              <input
                type="email"
                placeholder="Email..."
                autoComplete="off"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </label>

            <label>
              <span>Password</span>
              <div className={classes.show__password}>
                <input
                  type={showPassword ? 'password' : 'text'}
                  placeholder="Password..."
                  autoComplete="off"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
                <div style={{ marginRight: '4%' }}>
                  {showPassword ? (
                    <EyeOff color="#ffffff" onClick={() => setShowPassword(false)} />
                  ) : (
                    <Eye color="#ffffff" onClick={() => setShowPassword(true)} />
                  )}
                </div>
              </div>
            </label>

            <Button py={10} size="lg" type="submit" isLoading={isLoading} bg={'brand.primary'}>
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
