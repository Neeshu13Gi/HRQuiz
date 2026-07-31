import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameLogin from './pages/GameLogin';
import QuizScreen from './pages/QuizScreen';
import QuizComplete from './pages/QuizComplete';
import Leaderboard from './pages/Leaderboard';
import HRPanel from './pages/HRPanel';
import SelectTeam from './pages/SelectTeam';
import QuestionList from './pages/QuestionList';
import EditQuestion from './pages/EditQuestion';

function App() {
  return (
    <Router>
      <Routes>
        {/* Player Flow */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<GameLogin />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/complete" element={<QuizComplete />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        
        {/* HR Flow */}
        <Route path="/hr/panel" element={<HRPanel />} />
        <Route path="/hr/team" element={<SelectTeam />} />
        <Route path="/hr/questions" element={<QuestionList />} />
        <Route path="/hr/edit/:id" element={<EditQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;
