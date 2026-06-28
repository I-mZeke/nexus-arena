import { useEffect, useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const GAMES = ['Todos', 'Valorant', 'CS2', 'League of Legends']

export default function LeaderboardPage() {
  const [players, setPlayers] = useState([])
  const [filter, setFilter] = useState('Todos')

  useEffect(() => {
    const game = filter === 'Todos' ? '' : filter
    axios.get(`${API}/api/leaderboard/${game ? `?game=${game}` : ''}`)
      .then(r => setPlayers(r.data))
      .catch(err => console.error(err))
  }, [filter])

  return (
    <div style={{padding:'2rem', background:'#0a0a1a', minHeight:'100vh'}}>
      <h2 style={{color:'#fff', fontSize:'1.8rem', marginBottom:'1.5rem'}}>
        🥇 Leaderboard Global
      </h2>

      <div style={{display:'flex', gap:'0.75rem', marginBottom:'2rem', flexWrap:'wrap'}}>
        {GAMES.map(g => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            style={{
              padding:'0.5rem 1.2rem',
              background: filter === g ? '#7c3aed' : '#1a1a2e',
              border: '1px solid #444',
              borderRadius:'20px',
              color:'#fff',
              cursor:'pointer',
              fontWeight: filter === g ? 'bold' : 'normal'
            }}>
            {g}
          </button>
        ))}
      </div>

      <div style={{background:'#111', borderRadius:'12px', border:'1px solid #333', overflow:'hidden'}}>
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'#1a1a2e'}}>
              {['#', 'Jugador', 'Juego', 'Victorias', 'Derrotas', 'Win Rate'].map(h => (
                <th key={h} style={{
                  color:'#888',
                  padding:'1rem',
                  textAlign:'left',
                  fontWeight:'normal',
                  fontSize:'0.85rem',
                  textTransform:'uppercase'
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map(p => (
              <tr key={p.rank} style={{
                borderTop:'1px solid #1a1a2e',
                background: p.rank === 1 ? 'rgba(124,58,237,0.1)' : 'transparent'
              }}>
                <td style={{
                  color: p.rank === 1 ? '#fbbf24' : p.rank === 2 ? '#9ca3af' : p.rank === 3 ? '#b45309' : '#aaa',
                  padding:'1rem',
                  fontWeight:'bold',
                  fontSize:'1.1rem'
                }}>
                  {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}
                </td>
                <td style={{color:'#fff', fontWeight:'bold', padding:'1rem'}}>{p.player}</td>
                <td style={{color:'#7c3aed', padding:'1rem'}}>{p.game}</td>
                <td style={{color:'#16a34a', padding:'1rem', fontWeight:'bold'}}>{p.wins}</td>
                <td style={{color:'#dc2626', padding:'1rem'}}>{p.losses}</td>
                <td style={{padding:'1rem'}}>
                  <span style={{
                    background: p.winrate >= 75 ? 'rgba(22,163,74,0.2)' : 'rgba(124,58,237,0.2)',
                    color: p.winrate >= 75 ? '#16a34a' : '#7c3aed',
                    padding:'0.2rem 0.6rem',
                    borderRadius:'20px',
                    fontWeight:'bold'
                  }}>
                    {p.winrate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}