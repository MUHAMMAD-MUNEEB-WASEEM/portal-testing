import { Suspense } from 'react';
import AppRouting from './AppRouting';
import Loader from './components/Loader';
import './styles/App.css';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Router>
          <AppRouting />
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
