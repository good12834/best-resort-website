import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ResortSection from "./components/ResortSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResortDetail from "./components/ResortDetail";
import About from "./components/About";
import Testimonials from "./components/Testimonials"; // Import the new Testimonials component
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Container fluid className="p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resorts" element={<ResortSection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />{" "}
          {/* Add Testimonials route */}
          <Route path="/resorts/:resortId" element={<ResortDetail />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
