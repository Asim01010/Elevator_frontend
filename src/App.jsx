import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Navbar from "./components/Navbar";
import Home from "./Home/Home";
import { Routes, Route } from "react-router-dom";
import ProjectDetail from "./Project/Projectdetail ";
import Profile from "./Profile/Profile";


const App = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/project" element={<ProjectDetail />} />
           <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  );
};

export default App;