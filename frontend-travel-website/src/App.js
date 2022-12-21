import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AddStory from './pages/AddStory';
import Home from './pages/Home';
import Login from './pages/Login';
import MyStory from './pages/MyStory';
import PerStory from './pages/PerStory';
import Register from './pages/Register';
import EditStory from './pages/EditStory'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/myStory" element={<MyStory/>}/>
          <Route path="/editStory/:storyID" element={<EditStory/>}/>
          <Route path="/addStory" element={<AddStory/>}/>
          <Route path="/story/:storyID" element={<PerStory/>}/>
          <Route path="*" element={<h1>Page Not Found.</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
