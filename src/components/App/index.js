import { Navigate, Route, Routes } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import Home from '../Pages/Home';
import Quizz from '../Pages/Quizz';
import Score from '../Pages/Score';
import Select from '../Pages/Select';
import Wrapper from '../Wrapper';
import './styles.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorie" element={<Select />} />
          <Route path="/quizz" element={<Quizz />} />
          <Route path="/score" element={<Score />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Wrapper>
      <Footer />
    </div>
  );
}

export default App;
