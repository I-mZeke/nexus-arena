import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import TournamentsPage from './pages/TournamentsPage'
import LeaderboardPage from './pages/LeaderboardPage'
import Navbar from './components/Navbar'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <PrivateRoute>
            <Navbar />
            <TournamentsPage />
          </PrivateRoute>
        } />
        <Route path="/leaderboard" element={
          <PrivateRoute>
            <Navbar />
            <LeaderboardPage />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}