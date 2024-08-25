import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Main from './pages/Main'
import Footer from './components/Footer'
import NotifiCreate from './pages/Notifications'


function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/dashboard" 
              element={user ? <Home /> : <Navigate to="/" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/dashboard" />} 
            />
            <Route path="/" 
            element={<Main/> }
            />
            <Route path='/dashboard/Notification' 
            element={user ? <NotifiCreate /> : <Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
