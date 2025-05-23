import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import BoardLayout from './components/Board';
import Alert from 'react-bootstrap/Alert';

function App() {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <div style={{maxWidth: "100%"}}>
      <h2 className='p-4 bg-dark text-white text-center'>Kaban Board</h2>
      {showAlert && (
        <Alert
          variant="primary"
          dismissible
          onClose={() => setShowAlert(false)}
          className='m-2'
        >
          Tasks are stored in the browser and may be lost if cache is cleared.
        </Alert>
      )}
      <BoardLayout/>
      
    </div>
  )
}

export default App
