import Profile from "./components/profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";  
import Register from "./pages/register";
function App() {
  return (
    <div className="bg-slate-400 bg-cover overflow-auto min-h-screen flex justify-center text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/register" Component={Register} />
          {localStorage.getItem("accessKeyToken") ? (
            <Route path="/" element={<Profile/>} />
          ) : (
            <Route path="/" Component={Login} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
