import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const resorts = [
  {
    name: "Paradise Beach Resort",
    bedCount: 2,
    balcony: true,
    petPolicy: "Pets Allowed (Small, $50 fee)",
  },
  {
    name: "Mountain Haven",
    bedCount: 1,
    balcony: false,
    petPolicy: "No Pets Allowed",
  },
  {
    name: "Tropical Oasis",
    bedCount: 3,
    balcony: true,
    petPolicy: "Pets Allowed (All sizes, no fee)",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resort: "",
    message: "",
    bedCount: "",
    balcony: "",
    petPolicy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry Submitted:", formData);
    alert("Your inquiry has been submitted!");
    setFormData({
      name: "",
      email: "",
      resort: "",
      message: "",
      bedCount: "",
      balcony: "",
      petPolicy: "",
    });
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Contact Us</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formResort">
              <Form.Label>Select Resort</Form.Label>
              <Form.Select
                name="resort"
                value={formData.resort}
                onChange={handleChange}
                required
              >
                <option value="">Choose a resort</option>
                {resorts.map((resort, index) => (
                  <option key={index} value={resort.name}>
                    {resort.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBedCount">
              <Form.Label>Preferred Bed Count</Form.Label>
              <Form.Select
                name="bedCount"
                value={formData.bedCount}
                onChange={handleChange}
              >
                <option value="">Any</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBalcony">
              <Form.Label>Balcony Preference</Form.Label>
              <Form.Select
                name="balcony"
                value={formData.balcony}
                onChange={handleChange}
              >
                <option value="">Any</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPetPolicy">
              <Form.Label>Pet Policy Preference</Form.Label>
              <Form.Select
                name="petPolicy"
                value={formData.petPolicy}
                onChange={handleChange}
              >
                <option value="">Any</option>
                <option value="Pets Allowed">Pets Allowed</option>
                <option value="No Pets Allowed">No Pets Allowed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your inquiry"
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              size="md"
              className="contact-btn"
            >
              Send Inquiry
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
