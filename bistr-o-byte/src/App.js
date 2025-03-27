import './App.css';
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ForgotPassword from './ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}
export default App;
