import React, { useState } from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const resorts = [
  {
    name: "Paradise Beach Resort",
    description: "A luxurious beachfront escape with stunning ocean views.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    roomSize: 450,
    viewType: "Ocean View",
    interiorDesign: "Contemporary Chic",
    roomImage:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    bedCount: 2,
    balcony: true,
    petPolicy: "Pets Allowed (Small, $50 fee)",
    wifiSpeed: 100,
    diningOptions: ["Fine Dining", "Beachfront Café"],
  },
  {
    name: "Mountain Haven",
    description: "Cozy cabins nestled in the mountains.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    roomSize: 350,
    viewType: "Mountain View",
    interiorDesign: "Rustic Cozy",
    roomImage:
      "https://images.unsplash.com/photo-1578683015117-b53515e067f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    bedCount: 1,
    balcony: false,
    petPolicy: "No Pets Allowed",
    wifiSpeed: 50,
    diningOptions: ["Rustic Bistro"],
  },
  {
    name: "Tropical Oasis",
    description: "An all-inclusive tropical paradise.",
    image:
      "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    roomSize: 500,
    viewType: "Garden & Ocean View",
    interiorDesign: "Tropical Modern",
    roomImage:
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    bedCount: 3,
    balcony: true,
    petPolicy: "Pets Allowed (All sizes, no fee)",
    wifiSpeed: 150,
    diningOptions: ["Tropical Buffet", "Seafood Grill", "Poolside Bar"],
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    caption: "Paradise Beach Resort - Oceanfront Bliss",
    type: "Beach",
  },
  {
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    caption: "Paradise Beach Resort - Luxurious Interiors",
    type: "Beach",
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    caption: "Paradise Beach Resort - Poolside Luxury",
    type: "Beach",
  },
  {
    src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    caption: "Paradise Beach Resort - Sunset Views",
    type: "Beach",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    caption: "Mountain Haven - Scenic Retreat",
    type: "Mountain",
  },
  {
    src: "https://images.unsplash.com/photo-1578683015117-b53515e067f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    caption: "Mountain Haven - Cozy Cabins",
    type: "Mountain",
  },
  {
    src: "https://images.unsplash.com/photo-1545156521-77b5d457ad07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    caption: "Mountain Haven - Winter Charm",
    type: "Mountain",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    caption: "Mountain Haven - Mountain Vista",
    type: "Mountain",
  },
  {
    src: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    caption: "Tropical Oasis - Tropical Paradise",
    type: "Tropical",
  },
  {
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    caption: "Tropical Oasis - Beach Serenity",
    type: "Tropical",
  },
  {
    src: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    caption: "Tropical Oasis - Modern Suites",
    type: "Tropical",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497595-8a52736e2131?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    caption: "Tropical Oasis - Lush Gardens",
    type: "Tropical",
  },
];

const Home = () => {
  const [filter, setFilter] = useState("All"); // State for filter type

  // Filter images based on selected type
  const filteredImages =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((image) => image.type === filter);

  return (
    <Container fluid className="p-0">
      {/* Hero Section */}
      <div className="hero-section text-center text-white d-flex align-items-center justify-content-center">
        <div>
          <h1 className="display-4">Welcome to Best Resorts</h1>
          <p className="lead">
            Discover luxury retreats tailored to your dreams
          </p>
          <Button
            as={Link}
            to="/resorts"
            variant="primary"
            size="lg"
            className="mt-3 hero-btn"
          >
            Discover More
          </Button>
        </div>
      </div>

      {/* Featured Resorts Carousel */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Featured Resorts</h2>
        <Carousel>
          {resorts.map((resort, index) => (
            <Carousel.Item key={index}>
              <Row className="align-items-center">
                <Col md={6}>
                  <img
                    className="d-block w-100"
                    src={resort.image}
                    alt={resort.name}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                </Col>
                <Col md={6} className="p-4">
                  <h3>{resort.name}</h3>
                  <p>{resort.description}</p>
                  <p>
                    <strong>Room Size:</strong> {resort.roomSize} sq ft
                  </p>
                  <p>
                    <strong>View:</strong> {resort.viewType}
                  </p>
                  <p>
                    <strong>Interior:</strong> {resort.interiorDesign}
                  </p>
                  <p>
                    <strong>Beds:</strong> {resort.bedCount}
                  </p>
                  <p>
                    <strong>Balcony:</strong> {resort.balcony ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Pet Policy:</strong> {resort.petPolicy}
                  </p>
                  <p>
                    <strong>Wi-Fi:</strong> {resort.wifiSpeed} Mbps
                  </p>
                  <p>
                    <strong>Dining:</strong> {resort.diningOptions.join(", ")}
                  </p>
                  <img
                    src={resort.roomImage}
                    alt={`${resort.name} room`}
                    className="img-thumbnail"
                    style={{ maxWidth: "150px" }}
                  />
                  <div className="mt-3">
                    <Button as={Link} to="/resorts" variant="primary">
                      Explore More
                    </Button>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* Photo Gallery Section with Filter */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Explore Our Resorts</h2>
        <div className="text-center mb-4">
          <Button
            variant={filter === "All" ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => setFilter("All")}
          >
            All
          </Button>
          <Button
            variant={filter === "Beach" ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => setFilter("Beach")}
          >
            Beach
          </Button>
          <Button
            variant={filter === "Mountain" ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => setFilter("Mountain")}
          >
            Mountain
          </Button>
          <Button
            variant={filter === "Tropical" ? "primary" : "outline-primary"}
            onClick={() => setFilter("Tropical")}
          >
            Tropical
          </Button>
        </div>
        <Carousel>
          {filteredImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image.src}
                alt={image.caption}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h3>{image.caption}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="text-center mt-3">
          <Button as={Link} to="/resorts" variant="outline-primary">
            See More Resorts
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default Home;
