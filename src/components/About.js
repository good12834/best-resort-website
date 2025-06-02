import React, { useState } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

const teamMembers = [
  {
    name: "Jane Doe",
    role: "Founder & CEO",
    bio: "With over 20 years in luxury hospitality, Jane founded Best Resorts to redefine travel experiences.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "John Smith",
    role: "Head of Operations",
    bio: "John ensures every resort runs smoothly, bringing his expertise in logistics and guest services.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Emily Rivera",
    role: "Creative Director",
    bio: "Emily designs the stunning interiors and dining experiences that make our resorts unique.",
    image:
      "https://www.possefoundation.org/uploads/images/_1280x800_crop_centers-center_90/Emily-Rivera-Hamilton-alum.png",
  },
];

const timelineEvents = [
  {
    year: "2015",
    event: "Best Resorts founded by Jane Doe with a vision for luxury travel.",
    details: "Started with a small team in a single office.",
  },
  {
    year: "2016",
    event: "Secured initial funding and began site selection for first resort.",
    details: "Raised $5M from investors.",
  },
  {
    year: "2017",
    event:
      "Opened Paradise Beach Resort, our first beachfront property in Miami.",
    details: "Welcomed 10,000 guests in the first year.",
  },
  {
    year: "2018",
    event: "Introduced eco-friendly initiatives across all properties.",
    details: "Reduced carbon footprint by 20%.",
  },
  {
    year: "2019",
    event:
      "Expanded with Mountain Haven, catering to adventure seekers in Colorado.",
    details: "Added skiing and hiking amenities.",
  },
  {
    year: "2020",
    event: "Launched virtual tours to adapt to global travel restrictions.",
    details: "Reached 1M online viewers.",
  },
  {
    year: "2022",
    event:
      "Opened Tropical Oasis, an all-inclusive tropical getaway in Puerto Vallarta.",
    details: "Introduced all-inclusive dining.",
  },
  {
    year: "2023",
    event: "Achieved 95% guest satisfaction rating across all resorts.",
    details: "Based on 50,000+ reviews.",
  },
  {
    year: "2024",
    event:
      "Added advanced amenities like high-speed Wi-Fi and gourmet dining options.",
    details: "Upgraded all resorts to 100+ Mbps Wi-Fi.",
  },
  {
    year: "2025",
    event:
      "Celebrating a decade of excellence with plans for new resort openings.",
    details: "Two new locations in development.",
  },
];

const About = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">About Best Resorts</h1>
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <Image
            src="https://static-new.lhw.com/HotelImages/Final/LW1319/lw1319_153456071_720x450.jpg"
            alt="Luxury Resort"
            fluid
            style={{ borderRadius: "10px" }}
          />
        </Col>
        <Col md={6}>
          <h3>Our Mission</h3>
          <p>
            At Best Resorts, we believe luxury should be an experience tailored
            to your desires. Our mission is to provide exceptional retreats that
            blend comfort, adventure, and unparalleled service across
            breathtaking destinations.
          </p>
          <h3>Why Choose Us?</h3>
          <ul>
            <li>Diverse portfolio of beach, mountain, and tropical resorts</li>
            <li>
              Top-tier amenities including high-speed Wi-Fi, gourmet dining, and
              pet-friendly options
            </li>
            <li>Commitment to sustainability and guest satisfaction</li>
          </ul>
        </Col>
      </Row>

      {/* Team Bios */}
      <h2 className="text-center mb-4">Meet Our Team</h2>
      <Row>
        {teamMembers.map((member, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="text-center">
              <Card.Img
                variant="top"
                src={member.image}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {member.role}
                </Card.Subtitle>
                <Card.Text>{member.bio}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Interactive Timeline */}
      <h2 className="text-center mb-4 mt-5">Our Journey</h2>
      <Row>
        <Col>
          <ul className="timeline">
            {timelineEvents.map((event, index) => (
              <li
                key={index}
                className="timeline-item"
                onMouseEnter={() => setExpandedEvent(index)}
                onMouseLeave={() => setExpandedEvent(null)}
              >
                <div className="timeline-year">{event.year}</div>
                <div className="timeline-content">
                  {event.event}
                  {expandedEvent === index && (
                    <p className="timeline-details">{event.details}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
