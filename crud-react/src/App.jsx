import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './layout/Navbar';
import ListData from './components/listdata/ListData'
import CreateList from './components/listdata/CreateList'
import EditList from './components/listdata/EditList'
function App() {

  return (
    <BrowserRouter>
      <> 
        <Navbar/>
        <Routes>
          <Route path="/" element={<ListData />} />
          <Route path="/create" element={<CreateList />} />
          <Route path="/edit/:id" element={<EditList />} />
        </Routes>
      </>
    </BrowserRouter>
);
}

export default App;

