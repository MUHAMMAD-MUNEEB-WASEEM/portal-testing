import 'react-phone-number-input/style.css';
import classes from './Signup.module.css';
import { useState } from 'react';
import AuthHeading from '../../../components/AuthHeading/AuthHeading';
import Form from '../../../components/Form/Form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { api } from '../../../services/api';

import PhoneInput from 'react-phone-number-input';
import GradientBg from '../../../components/AuthBackground/GradientBg';
import { Eye, EyeOff } from 'lucide-react';
import useToast from '../../../hooks/useToast';

const reactPhoneInputStyle = {
  width: '100%',
  outline: 'none',
  padding: '14px 20px',
  borderRadius: '25px',
  border: '2px solid #ffffff',
  background: 'transparent!important',
  color: '#ffffff',
};

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    pseudo: '',
    usNumber: '',
    pkNumber: '',
    email: '',
    password: '',
  });

  const { showErrorToast, showSuccessToast } = useToast();
  const { token } = useParams();
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [usNumber, setUsNumber] = useState(null);
  const [pkNumber, setPkNumber] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      name: userData.name,
      pseudo: userData.pseudo,
      usNumber: usNumber,
      pkNumber: pkNumber,
      email: userData.email,
      password: userData.password,
    };

    try {
      const { data } = await api.post(`/api/v1/users/signup/${token}`, payload);

      if (data) {
        localStorage.setItem('User', JSON.stringify(data));

        dispatch({
          type: 'LOGIN',
          payload: data,
        });
        setUserData({ ...userData, name: '', email: '', password: '' });
        showSuccessToast(`${data?.message} -`);
      }
      setIsLoading(false);

      navigate('/login');
    } catch (error) {
      showErrorToast(`${error?.response?.data} !`);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.signupContainer}>
      <GradientBg />
      <div className={classes.signupInner}>
        <Form>
          <AuthHeading
            headingTitle="Register Now"
            headingText="See your growth finance here and let see your profit you get now"
          />
          <form className={classes.formGroup} onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input
                type="text"
                autoComplete="off"
                placeholder="Enter your name..."
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </label>
            <label>
              <span>Pseudo</span>
              <input
                type="text"
                autoComplete="off"
                placeholder="Pseudo..."
                value={userData.pseudo}
                onChange={(e) => setUserData({ ...userData, pseudo: e.target.value })}
              />
            </label>
            <label>
              <span>US Number</span>
              <PhoneInput
                style={reactPhoneInputStyle}
                className={classes.phoneStyle}
                country="US"
                defaultCountry="US"
                placeholder="Enter number"
                value={usNumber}
                onChange={setUsNumber}
              />
            </label>
            <label>
              <span>PK Number</span>
              <PhoneInput
                style={reactPhoneInputStyle}
                className={classes.phoneStyle}
                country="PK"
                defaultCountry="PK"
                placeholder="Enter number"
                value={pkNumber}
                onChange={setPkNumber}
              />
            </label>

            <label>
              <span>Email Address</span>
              <input
                type="email"
                autoComplete="off"
                placeholder="Email..."
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
                {showPassword ? (
                  <EyeOff color="#ffffff" onClick={() => setShowPassword(false)} />
                ) : (
                  <Eye color="#ffffff" onClick={() => setShowPassword(true)} />
                )}
              </div>
            </label>

            <div className={classes.checkbox}>
              <input type="checkbox" onClick={() => setIsChecked(!isChecked)} />
              <span>
                Accept all applicable{' '}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="/terms-and-conditions"
                  style={{ color: '#1B9DE4' }}
                >
                  {' '}
                  Terms and Conditions{' '}
                </Link>{' '}
              </span>
            </div>
            {isLoading ? (
              <button styles={{ opacity: '0.8' }} disabled={isLoading}>
                Loading...
              </button>
            ) : (
              <button
                disabled={!isChecked}
                style={{
                  opacity: !isChecked ? 0.5 : 1,
                  cursor: !isChecked ? 'not-allowed' : 'pointer',
                }}
              >
                Signup
              </button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
