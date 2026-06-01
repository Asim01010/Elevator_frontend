import Navbar from "./components/Navbar";
import Home from "./Home/Home";


const App = () => {
  return (
    <>
      {/* Global Navbar always stays on top */}
      <Navbar />

      {/* Main layout switcher */}
      <main className="min-h-screen bg-slate-950">
   <Home/>
      </main>
    </>
  );
};

export default App;