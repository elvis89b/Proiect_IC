import './App.css';
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Homepage from './Homepage';
import Fridge from './Fridge';
import MealPlanner from './MealPlanner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/fridge" element={<Fridge/>}/>
        <Route path="/meal-planner" element={<MealPlanner />} />

      </Routes>
    </Router>
  );
}
export default App;
