import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>⚔️ NEXUS ARENA</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>🏆 Torneos</Link>
        <Link to="/leaderboard" style={styles.link}>🥇 Leaderboard</Link>
      </div>
      <div style={styles.user}>
        <span style={styles.username}>👤 {username}</span>
        <button style={styles.logoutBtn} onClick={logout}>Cerrar Sesión</button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: '#111',
    borderBottom: '1px solid #7c3aed',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    color: '#7c3aed',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  },
  links: {
    display: 'flex',
    gap: '2rem'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500'
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  username: {
    color: '#888'
  },
  logoutBtn: {
    background: '#dc2626',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    padding: '0.4rem 1rem',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
}