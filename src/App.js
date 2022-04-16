import { BrowserRouter,Routes,Route,} from "react-router-dom";
import Admin from './admin/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateBooking from './CreateBooking';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<CreateBooking/>} />
        <Route path='/admin' element={<Admin/>} />    
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
