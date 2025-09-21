import Welcome from "./components/welcome";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Jobs from "./components/jobs";
import Interview from "./components/interview";
import Mentor from "./components/mentor";
import Community from "./components/community"
import References  from "./components/refrence";

import { Routes, Route } from "react-router-dom";

import "./styles/curvedNav.css"
import "./styles/box.css"
import "./styles/welcome.css"
import "./styles/login.css"
import "./styles/slide.css"
import "./styles/dashboard.css"
import "./styles/news.css"

function App(){
  return (
    <div className="App">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Agdasima&display=swap" rel="stylesheet"/>
      </head>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/news" element={<Jobs />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/reference" element={<References />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </div>
  )
}

export default App;
