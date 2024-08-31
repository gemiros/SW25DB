import { useEffect, useState } from 'react';
import { MonsterIndex } from './components/monster/Index';
import MonsterView from './components/monster/Preview';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { getData, loadFirestoreBundle } from './firebaseConfig';
import { Container, Paper } from '@mui/material';
import MonsterCreate from './components/monster/Create';
import AutohideSnackbar from './components/utilComponent/snackbar';

export const monsterViewIndex = "/"
export const monsterViewDetail = "/monster/view"

// const location = useLocation()
function App() {
  const [monsters, setMonsters] = useState<monster.monster[]>([]);
  const [open, setOpen] = useState(false);

  const [snackbarText, setSnackbarText] = useState<string>('')

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        const bundleData = await getData()
        await setMonsters(bundleData)
      } catch (error) {
        console.error('Error fetching monsters:', error);
      }
    };
    fetchMonsters()
  }, []);
  return (
    <div style={{
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      <Container sx={{
        margin: 0,
        backgroundColor: '#cccccc',
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Paper sx={{ padding: 2, marginY: 1, width: '50em' }}>
          <main>
            <Router>
              <Link to={monsterViewIndex}>一覧へ</Link>
              <Routes>
                <Route path='/' element={<MonsterIndex monsters={monsters} setMonster={setMonsters} />} />
                <Route path='/monster/create' element={<MonsterCreate setOpen={setOpen} setSnackbarText={setSnackbarText} />} />
                <Route path='/monster/edit/:name' element={<MonsterCreate monsters={monsters} setOpen={setOpen} setSnackbarText={setSnackbarText} />} />
                <Route path='/monster/duplicate/:name' element={<MonsterCreate monsters={monsters} setOpen={setOpen} setSnackbarText={setSnackbarText} />} />
                <Route path='/monster/view/:name' element={<MonsterView monsters={monsters} />} />
              </Routes>
            </Router>
          </main>
        </Paper>
        <AutohideSnackbar snackBarText={snackbarText} open={open} setOpen={setOpen}></AutohideSnackbar>
      </Container>
    </div>
  );
}

export default App;