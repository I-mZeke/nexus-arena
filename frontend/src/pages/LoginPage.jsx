import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API}/api/auth/login`, form)
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('username', res.data.username)
      navigate('/')
    } catch {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>⚔️ NEXUS ARENA</h1>
        <p style={styles.subtitle}>Plataforma de Torneos Esports</p>
        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            placeholder="Usuario"
            value={form.username}
            onChange={e => setForm({...form, username: e.target.value})}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
          />
          {error && <p style={{color:'#ff4444', marginBottom:'1rem'}}>{error}</p>}
          <button style={styles.button} type="submit">INGRESAR</button>
        </form>
        <p style={{color:'#888', marginTop:'1rem', fontSize:'0.8rem'}}>
          Demo: admin / nexus123
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0a0a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    background: '#111',
    border: '1px solid #7c3aed',
    borderRadius: '12px',
    padding: '2.5rem',
    width: '360px',
    textAlign: 'center'
  },
  title: { color: '#7c3aed', fontSize: '2rem', margin: '0 0 0.5rem' },
  subtitle: { color: '#888', marginBottom: '2rem' },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    background: '#1a1a2e',
    border: '1px solid #333',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    background: '#7c3aed',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
}