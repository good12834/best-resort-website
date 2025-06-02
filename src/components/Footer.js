import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Best Resorts</h5>
            <p>Luxury escapes designed for you.</p>
          </Col>
          <Col md={4}>
            <h5>Explore Our Resorts</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/resorts/paradise-beach" className="text-white">
                  Paradise Beach Resort
                </Link>
              </li>
              <li>
                <Link to="/resorts/mountain-haven" className="text-white">
                  Mountain Haven
                </Link>
              </li>
              <li>
                <Link to="/resorts/tropical-oasis" className="text-white">
                  Tropical Oasis
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Stay Updated</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="footer-btn">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; 2025 Best Resorts. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
