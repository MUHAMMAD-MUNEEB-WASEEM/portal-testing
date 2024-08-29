import 'react-toastify/dist/ReactToastify.css';
import 'react-multi-email/dist/style.css';
import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { InvoiceContextProvider } from './context/InvoiceContext';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
//TEsting
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: {
    brand: {
      primary: '#0c4969',
      secondary: '#1b9ee4',
      text: '#fff',
      lightText: 'rgba(255, 255, 255, 0.8)',
      bg: '#fff',
    },
  },
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Provider store={store}>
        <AuthContextProvider>
          <InvoiceContextProvider>
            <App />
            <ToastContainer />
          </InvoiceContextProvider>
        </AuthContextProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
);
