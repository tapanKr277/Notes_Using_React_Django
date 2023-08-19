import './App.css';
import { NotesListPage } from './pages/NotesListPage';
import { HashRouter as Router, Routes,Route } from 'react-router-dom';
import { NotePage } from './pages/NotePage';
import { Header } from './components/Header';
import { NoMatch } from './components/NoMatch';


function App() {
  
  
  return (
    <div className='container dark'>
    <div className='app'>
    <Header></Header>
      <Router>
     <Routes>
     <Route path='/' element={<NotesListPage></NotesListPage>} />
      <Route path='/note/:id' element={<NotePage></NotePage>} />
     <Route path='*' element={<NoMatch></NoMatch>}/>
    </Routes>
      </Router> 
    </div>
         
    </div>
  );
}

export default App;

