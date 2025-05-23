import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardLayout from './components/Board';
import Button from 'react-bootstrap/Button';
import { deleteBoard, loadTasks } from './utils/boardfetch';

function App() {
  const claerBoard = () => {
    deleteBoard();
    loadTasks();
  }
  return (
    <div style={{maxWidth: "100%"}}>
      <h2 className='p-4 bg-dark text-white text-center'>Kaban Board</h2>
      <BoardLayout/>
      <div className='col text-center mt-4'>
        <Button variant='danger' onClick={claerBoard}>Clear Board</Button>
      </div>
    </div>
  )
}

export default App
