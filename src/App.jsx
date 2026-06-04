import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Navbar from "./components/Navbar";
import Home from "./Home/Home";
import { Routes, Route } from "react-router-dom";
import ProjectDetail from "./Project/Projectdetail ";
import Profile from "./Profile/Profile";
import ProfileEdit from "./Profile/Profile-edit";


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
           <Route path="/profile-edit" element={<ProfileEdit />} />
        </Routes>
      </main>
    </>
  );
};

export default App;