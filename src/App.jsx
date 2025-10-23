import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Courses from "./pages/Courses.jsx";
import Contact from "./pages/Contact.jsx"
import Register from './pages/Register.jsx'
import LearningMaterials from "./pages/LearningMaterials.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/learning-materials" element={<LearningMaterials />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
