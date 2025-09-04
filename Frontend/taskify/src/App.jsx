import Home from './Components/Home/Home'
import Loginorsignin from './Components/Loginorsignin/Loginorsignin'
import ProtectedRoute from './Components/ProtectedRoute'
import Team from './Components/Team/Team'
import {BrowserRouter,Routes,Route} from 'react-router'
import Dashboard from './Components/Dashboard/Dashboard'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Loginorsignin />} />
        <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}



export default App
