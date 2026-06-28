import { useEffect, useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([])
  const [form, setForm] = useState({ name:'', game:'', slots:16, date:'' })

  useEffect(() => { fetchTournaments() }, [])

  const fetchTournaments = async () => {
    const res = await axios.get(`${API}/api/tournaments/`)
    setTournaments(res.data)
  }

  const createTournament = async () => {
    if (!form.name || !form.game || !form.date) return
    await axios.post(`${API}/api/tournaments/`, form)
    fetchTournaments()
    setForm({ name:'', game:'', slots:16, date:'' })
  }

  const joinTournament = async (id) => {
    await axios.post(`${API}/api/tournaments/${id}/join`)
    fetchTournaments()
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>🏆 Torneos Activos</h2>

      <div style={styles.card}>
        <h3 style={{color:'#7c3aed', marginTop:0}}>Crear Nuevo Torneo</h3>
        <div style={styles.formRow}>
          <input
            style={styles.input}
            placeholder="Nombre del torneo"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
          />
          <input
            style={styles.input}
            placeholder="Juego (ej: Valorant)"
            value={form.game}
            onChange={e => setForm({...form, game: e.target.value})}
          />
          <input
            style={styles.input}
            type="number"
            placeholder="Cupos"
            value={form.slots}
            onChange={e => setForm({...form, slots: parseInt(e.target.value)})}
          />
          <input
            style={styles.input}
            type="date"
            value={form.date}
            onChange={e => setForm({...form, date: e.target.value})}
          />
          <button style={styles.button} onClick={createTournament}>
            + Crear
          </button>
        </div>
      </div>

      <div style={styles.grid}>
        {tournaments.map(t => (
          <div key={t.id} style={styles.tournamentCard}>
            <h3 style={{color:'#fff', margin:'0 0 0.5rem'}}>{t.name}</h3>
            <p style={styles.detail}>🎮 {t.game}</p>
            <p style={styles.detail}>👥 {t.registered}/{t.slots} jugadores</p>
            <p style={styles.detail}>📅 {t.date}</p>
            <span style={{
              ...styles.badge,
              background: t.status === 'open' ? '#16a34a' : '#dc2626'
            }}>
              {t.status === 'open' ? 'ABIERTO' : 'LLENO'}
            </span>
            {t.status === 'open' && (
              <button style={styles.joinBtn} onClick={() => joinTournament(t.id)}>
                Inscribirse
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  page: { padding:'2rem', background:'#0a0a1a', minHeight:'100vh' },
  heading: { color:'#fff', fontSize:'1.8rem', marginBottom:'1.5rem' },
  card: {
    background:'#111',
    border:'1px solid #333',
    borderRadius:'8px',
    padding:'1.5rem',
    marginBottom:'2rem'
  },
  formRow: { display:'flex', gap:'1rem', flexWrap:'wrap', alignItems:'center' },
  input: {
    padding:'0.6rem',
    background:'#1a1a2e',
    border:'1px solid #444',
    borderRadius:'6px',
    color:'#fff',
    flex:'1',
    minWidth:'140px'
  },
  button: {
    padding:'0.6rem 1.5rem',
    background:'#7c3aed',
    border:'none',
    borderRadius:'6px',
    color:'#fff',
    cursor:'pointer',
    fontWeight:'bold'
  },
  grid: {
    display:'grid',
    gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',
    gap:'1.5rem'
  },
  tournamentCard: {
    background:'#111',
    border:'1px solid #333',
    borderRadius:'12px',
    padding:'1.5rem'
  },
  detail: { color:'#aaa', margin:'0.25rem 0' },
  badge: {
    display:'inline-block',
    padding:'0.2rem 0.8rem',
    borderRadius:'20px',
    fontSize:'0.75rem',
    fontWeight:'bold',
    color:'#fff',
    marginTop:'0.5rem'
  },
  joinBtn: {
    display:'block',
    width:'100%',
    marginTop:'1rem',
    padding:'0.6rem',
    background:'#059669',
    border:'none',
    borderRadius:'6px',
    color:'#fff',
    cursor:'pointer',
    fontWeight:'bold'
  }
}