import { BrowserRouter,Routes,Route,} from "react-router-dom";
import AdminDashboard from './AdminDashboard';
import './App.css';
import RegisterUser from './RegisterUser';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<RegisterUser/>} />
        <Route path='/admin' element={<AdminDashboard/>} />    
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
