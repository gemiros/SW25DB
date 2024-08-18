import { useEffect, useState } from 'react';
import { MonsterIndex } from './components/monster/Index';
import MonsterView from './components/monster/Preview';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { loadFirestoreBundle } from './firebaseConfig';
import { Container, Paper } from '@mui/material';

// const baseUrl ='http://localhost:5001/sw25datas/us-central1/getDatas'
const baseUrl = 'http://localhost:5000'

export const monsterViewIndex = "/"
export const monsterViewDetail = "/monster/view"

function App() {
  const [monsters, setMonsters] = useState<monster.monster[]>([]);

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        const bundleData = await loadFirestoreBundle(baseUrl)
        await setMonsters(bundleData)
      } catch (error) {
        console.error('Error fetching monsters:', error);
      }
    };
    fetchMonsters()
  }, []);

  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Container sx={{
        margin: 0,
        backgroundColor: '#cccccc', padding: 0,
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Paper sx={{ padding: 2, marginY: 1, minWidth: '32em', width: '50em' }}>
          <main>
            <Router>
              <Link to={monsterViewIndex}>一覧へ</Link>
              <Routes>
                <Route path='/' element={<MonsterIndex monsters={monsters} setMonster={setMonsters} />} />
                <Route path='/monster/view/:name' element={<MonsterView monsters={monsters} />} />
              </Routes>
            </Router>
          </main>
        </Paper>
      </Container>
    </div>
  );
}

export default App;