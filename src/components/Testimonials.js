import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Alex P.",
    rating: 5,
    comment:
      "Paradise Beach Resort was a dream! The staff went above and beyond.",
    resort: "Paradise Beach Resort",
    type: "text",
  },
  {
    name: "Mike T.",
    rating: 4.5,
    comment:
      "Mountain Haven’s cozy cabins and trails were perfect for a weekend escape.",
    resort: "Mountain Haven",
    type: "text",
  },
  {
    name: "Emma W.",
    rating: 4.8,
    comment:
      "Tropical Oasis had the best food and pet-friendly vibe I’ve ever experienced!",
    resort: "Tropical Oasis",
    type: "text",
  },
  {
    name: "Sara M.",
    rating: 4,
    comment: "Loved the views at Paradise Beach, but Wi-Fi could improve.",
    resort: "Paradise Beach Resort",
    type: "text",
  },
  {
    name: "Carlos G.",
    rating: 5,
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    resort: "Tropical Oasis",
    type: "video",
  },
  {
    name: "Lisa R.",
    rating: 4.5,
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    resort: "Mountain Haven",
    type: "video",
  },
];

const Testimonials = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Guest Testimonials</h1>
      <Row>
        {testimonials.map((testimonial, index) => (
          <Col md={6} key={index} className="mb-4">
            <Card className="testimonial-card">
              <Card.Body>
                <Card.Title>{testimonial.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {testimonial.resort} - {testimonial.rating}/5 <FaStar />
                </Card.Subtitle>
                {testimonial.type === "text" ? (
                  <Card.Text>"{testimonial.comment}"</Card.Text>
                ) : (
                  <iframe
                    width="100%"
                    height="200"
                    src={testimonial.video}
                    title={`${testimonial.name} Testimonial`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;
