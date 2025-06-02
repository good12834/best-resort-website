import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Dropdown,
  Badge,
  Table,
  Image,
} from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import { FaStar, FaHeart, FaCalendarAlt, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const resorts = [
  {
    name: "Paradise Beach Resort",
    description: "A luxurious beachfront escape.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    type: "Beach",
    tour: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    lat: 25.7617,
    lon: -80.1918,
    rating: 4.8,
    price: 450,
    availability: ["2025-04-05", "2025-04-06", "2025-04-10"],
    amenities: ["Pool", "Spa", "Beach Access"],
    location: "Miami, FL",
    reviews: 120,
    distanceFromAirport: 12,
    staffRating: 4.7,
    roomTypes: ["Oceanfront Suite", "Deluxe Room", "Penthouse"],
    buildingStyle: "Modern Coastal",
    additionalFacilities: ["Rooftop Bar", "Fitness Center", "Conference Room"],
    roomSize: 450,
    viewType: "Ocean View",
    interiorDesign: "Contemporary Chic",
    roomImage:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/536938842.jpg?k=0dbd275c229bd8862b825930a1ae181e0e81981a1855b6220d5ec6a39e3c061c&o=&hp=1",
    bedCount: 2,
    balcony: true,
    petPolicy: "Pets Allowed (Small, $50 fee)",
    wifiSpeed: 100, // Mbps
    diningOptions: ["Fine Dining", "Beachfront Café"], // Array of dining options
  },
  {
    name: "Mountain Haven",
    description: "Cozy cabins in the mountains.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    type: "Mountain",
    tour: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    lat: 39.5501,
    lon: -105.7821,
    rating: 4.6,
    price: 300,
    availability: ["2025-04-07", "2025-04-08", "2025-04-12"],
    amenities: ["Skiing", "Fireplace", "Hiking"],
    location: "Colorado Rockies",
    reviews: 85,
    distanceFromAirport: 45,
    staffRating: 4.5,
    roomTypes: ["Cabin Suite", "Standard Room"],
    buildingStyle: "Rustic Log",
    additionalFacilities: ["Sauna", "Outdoor Hot Tub"],
    roomSize: 350,
    viewType: "Mountain View",
    interiorDesign: "Rustic Cozy",
    roomImage:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/375972923.jpg?k=097bafe4787f1d12cb12c285f189b1d0b005c9fa45bf1f42b6742b94fb06aa9d&o=&hp=1",
    bedCount: 1,
    balcony: false,
    petPolicy: "No Pets Allowed",
    wifiSpeed: 50, // Mbps
    diningOptions: ["Rustic Bistro"], // Array of dining options
  },
  {
    name: "Tropical Oasis",
    description: "An all-inclusive tropical getaway.",
    image:
      "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    type: "Tropical",
    tour: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    lat: 20.6534,
    lon: -105.2253,
    rating: 4.9,
    price: 600,
    availability: ["2025-04-09", "2025-04-11", "2025-04-13"],
    amenities: ["All-Inclusive", "Pool", "Excursions"],
    location: "Puerto Vallarta, MX",
    reviews: 150,
    distanceFromAirport: 8,
    staffRating: 4.9,
    roomTypes: ["Tropical Villa", "Junior Suite", "Master Suite"],
    buildingStyle: "Tropical Contemporary",
    additionalFacilities: ["Infinity Pool", "Yoga Studio", "Nightclub"],
    roomSize: 500,
    viewType: "Garden & Ocean View",
    interiorDesign: "Tropical Modern",
    roomImage:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/110011261.jpg?k=e1f59da854822f256dfc1e980f92c40bd7f2df8d0350d3edc712b29cd889b703&o=&hp=1",
    bedCount: 3,
    balcony: true,
    petPolicy: "Pets Allowed (All sizes, no fee)",
    wifiSpeed: 150, // Mbps
    diningOptions: ["Tropical Buffet", "Seafood Grill", "Poolside Bar"], // Array of dining options
  },
];

const ResortSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedResort, setSelectedResort] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [filter, setFilter] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortOption, setSortOption] = useState("Default");
  const [showTour, setShowTour] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [showAvailability, setShowAvailability] = useState(false);
  const [compareResorts, setCompareResorts] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [compareSortField, setCompareSortField] = useState(null);
  const [compareSortDirection, setCompareSortDirection] = useState("asc");

  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API key
      const weather = {};
      for (const resort of resorts) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${resort.lat}&lon=${resort.lon}&units=metric&appid=${apiKey}`
          );
          weather[
            resort.name
          ] = `${response.data.main.temp}°C, ${response.data.weather[0].description}`;
        } catch (error) {
          weather[resort.name] = "Weather unavailable";
        }
      }
      setWeatherData(weather);
    };
    fetchWeather();
  }, []);

  const handleShow = (resort) => {
    setSelectedResort(resort);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedResort(null);
    setFormData({ name: "", checkIn: "", checkOut: "", guests: 1 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Submitted:", {
      resort: selectedResort.name,
      ...formData,
    });
    alert(`Booking confirmed for ${selectedResort.name}!`);
    handleClose();
  };

  const handleTour = (resort) => {
    setSelectedResort(resort);
    setShowTour(true);
  };

  const toggleFavorite = (resortName) => {
    setFavorites((prev) =>
      prev.includes(resortName)
        ? prev.filter((name) => name !== resortName)
        : [...prev, resortName]
    );
  };

  const toggleCompare = (resort) => {
    setCompareResorts((prev) =>
      prev.includes(resort)
        ? prev.filter((r) => r.name !== resort.name)
        : [...prev, resort]
    );
  };

  const handleAvailability = (resort) => {
    setSelectedResort(resort);
    setShowAvailability(true);
  };

  const sortCompareTable = (field) => {
    const direction =
      compareSortField === field && compareSortDirection === "asc"
        ? "desc"
        : "asc";
    setCompareSortField(field);
    setCompareSortDirection(direction);

    setCompareResorts((prev) =>
      [...prev].sort((a, b) => {
        let valueA = a[field];
        let valueB = b[field];
        if (
          field === "amenities" ||
          field === "availability" ||
          field === "roomTypes" ||
          field === "additionalFacilities" ||
          field === "diningOptions"
        ) {
          valueA = a[field].length;
          valueB = b[field].length;
        } else if (field === "balcony") {
          valueA = a[field] ? 1 : 0;
          valueB = b[field] ? 1 : 0;
        } else if (field === "petPolicy") {
          valueA = a[field].includes("Allowed") ? 1 : 0;
          valueB = b[field].includes("Allowed") ? 1 : 0;
        }
        if (
          field === "name" ||
          field === "type" ||
          field === "location" ||
          field === "buildingStyle" ||
          field === "viewType" ||
          field === "interiorDesign" ||
          field === "petPolicy"
        ) {
          return direction === "asc"
            ? valueA.toString().localeCompare(valueB.toString())
            : valueB.toString().localeCompare(valueA.toString());
        }
        return direction === "asc" ? valueA - valueB : valueB - valueA;
      })
    );
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Resort Comparison", 20, 10);
    doc.autoTable({
      startY: 20,
      head: [["Feature", ...compareResorts.map((r) => r.name)]],
      body: [
        ["Type", ...compareResorts.map((r) => r.type)],
        ["Rating", ...compareResorts.map((r) => `${r.rating} ★`)],
        ["Price/Night", ...compareResorts.map((r) => `$${r.price}`)],
        ["Weather", ...compareResorts.map((r) => weatherData[r.name] || "N/A")],
        [
          "Availability",
          ...compareResorts.map((r) => `${r.availability.length} dates`),
        ],
        ["Amenities", ...compareResorts.map((r) => r.amenities.join(", "))],
        ["Location", ...compareResorts.map((r) => r.location)],
        ["Reviews", ...compareResorts.map((r) => r.reviews)],
        [
          "Distance from Airport (km)",
          ...compareResorts.map((r) => `${r.distanceFromAirport} km`),
        ],
        ["Staff Rating", ...compareResorts.map((r) => `${r.staffRating} ★`)],
        ["Room Types", ...compareResorts.map((r) => r.roomTypes.join(", "))],
        ["Building Style", ...compareResorts.map((r) => r.buildingStyle)],
        [
          "Additional Facilities",
          ...compareResorts.map((r) => r.additionalFacilities.join(", ")),
        ],
        [
          "Room Size (sq ft)",
          ...compareResorts.map((r) => `${r.roomSize} sq ft`),
        ],
        ["View Type", ...compareResorts.map((r) => r.viewType)],
        ["Interior Design", ...compareResorts.map((r) => r.interiorDesign)],
        ["Bed Count", ...compareResorts.map((r) => r.bedCount)],
        ["Balcony", ...compareResorts.map((r) => (r.balcony ? "Yes" : "No"))],
        ["Pet Policy", ...compareResorts.map((r) => r.petPolicy)],
        [
          "Wi-Fi Speed (Mbps)",
          ...compareResorts.map((r) => `${r.wifiSpeed} Mbps`),
        ],
        [
          "Dining Options",
          ...compareResorts.map((r) => r.diningOptions.join(", ")),
        ],
      ],
    });
    doc.save("resort-comparison.pdf");
  };

  const getBestValue = () => {
    return compareResorts.reduce((best, current) => {
      const bestValue = best.rating / best.price;
      const currentValue = current.rating / current.price;
      return currentValue > bestValue ? current : best;
    }, compareResorts[0]);
  };

  const filteredResorts = resorts
    .filter((resort) => {
      const typeMatch = filter === "All" || resort.type === filter;
      const priceMatch =
        priceRange === "All" ||
        (priceRange === "Low" && resort.price <= 350) ||
        (priceRange === "Medium" &&
          resort.price > 350 &&
          resort.price <= 500) ||
        (priceRange === "High" && resort.price > 500);
      return typeMatch && priceMatch;
    })
    .sort((a, b) => {
      if (sortOption === "PriceLow") return a.price - b.price;
      if (sortOption === "PriceHigh") return b.price - a.price;
      if (sortOption === "Rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <Container className="my-5">
      <animated.h2 style={fadeIn} className="text-center mb-4">
        Our Exclusive Retreats
      </animated.h2>
      <Row className="mb-4 justify-content-center">
        <Col md={3} className="text-center">
          <Dropdown onSelect={(key) => setFilter(key)}>
            <Dropdown.Toggle variant="primary" id="dropdown-type">
              Filter by Type: {filter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Beach">Beach</Dropdown.Item>
              <Dropdown.Item eventKey="Mountain">Mountain</Dropdown.Item>
              <Dropdown.Item eventKey="Tropical">Tropical</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={3} className="text-center">
          <Dropdown onSelect={(key) => setPriceRange(key)}>
            <Dropdown.Toggle variant="primary" id="dropdown-price">
              Filter by Price: {priceRange}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Low">Low ($0 - $350)</Dropdown.Item>
              <Dropdown.Item eventKey="Medium">
                Medium ($351 - $500)
              </Dropdown.Item>
              <Dropdown.Item eventKey="High">High ($501+)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={3} className="text-center">
          <Dropdown onSelect={(key) => setSortOption(key)}>
            <Dropdown.Toggle variant="primary" id="dropdown-sort">
              Sort by: {sortOption}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Default">Default</Dropdown.Item>
              <Dropdown.Item eventKey="PriceLow">
                Price (Low to High)
              </Dropdown.Item>
              <Dropdown.Item eventKey="PriceHigh">
                Price (High to Low)
              </Dropdown.Item>
              <Dropdown.Item eventKey="Rating">
                Rating (High to Low)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        {filteredResorts.map((resort, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Img variant="top" src={resort.image} />
              <Card.Body>
                <Card.Title>
                  {resort.name}
                  <Button
                    variant="link"
                    className="p-0 ms-2 favorite-btn"
                    onClick={() => toggleFavorite(resort.name)}
                  >
                    <FaHeart
                      color={
                        favorites.includes(resort.name) ? "#D4AF37" : "#ccc"
                      }
                    />
                  </Button>
                </Card.Title>
                <Card.Text>{resort.description}</Card.Text>
                <Card.Text className="text-muted">
                  Rating:{" "}
                  <Badge bg="warning" text="dark">
                    {resort.rating} <FaStar />
                  </Badge>
                </Card.Text>
                <Card.Text className="text-muted">
                  Price: ${resort.price}/night
                </Card.Text>
                <Card.Text className="text-muted">
                  Weather: {weatherData[resort.name] || "Loading..."}
                </Card.Text>
                <div className="d-flex flex-wrap justify-content-center">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleShow(resort)}
                    className="me-2 mb-2"
                  >
                    Book VIP Package
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleTour(resort)}
                    className="me-2 mb-2"
                  >
                    Virtual Tour
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleAvailability(resort)}
                    className="me-2 mb-2 availability-btn"
                  >
                    <FaCalendarAlt /> Availability
                  </Button>
                  <Button
                    variant={
                      compareResorts.includes(resort)
                        ? "danger"
                        : "outline-primary"
                    }
                    size="sm"
                    onClick={() => toggleCompare(resort)}
                    className="mb-2 compare-btn"
                  >
                    {compareResorts.includes(resort)
                      ? "Remove from Compare"
                      : "Compare"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {compareResorts.length > 0 && (
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => setShowCompare(true)}
        >
          Compare Selected Resorts ({compareResorts.length})
        </Button>
      )}

      {/* Booking Modal */}
      {selectedResort && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Book {selectedResort.name} - VIP Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCheckIn">
                <Form.Label>Check-In Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCheckOut">
                <Form.Label>Check-Out Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={
                    formData.checkIn || new Date().toISOString().split("T")[0]
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGuests">
                <Form.Label>Number of Guests</Form.Label>
                <Form.Control
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit Booking
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Virtual Tour Modal */}
      {selectedResort && (
        <Modal show={showTour} onHide={() => setShowTour(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Virtual Tour: {selectedResort.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe
              width="100%"
              height="400"
              src={selectedResort.tour}
              title="Virtual Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p className="mt-3">
              Experience the luxury of {selectedResort.name} from anywhere.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowTour(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Availability Modal */}
      {selectedResort && (
        <Modal
          show={showAvailability}
          onHide={() => setShowAvailability(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Availability: {selectedResort.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Available Dates:</h5>
            <ul>
              {selectedResort.availability.map((date, index) => (
                <li key={index}>{new Date(date).toLocaleDateString()}</li>
              ))}
            </ul>
            <p className="text-muted">
              Note: Availability is subject to change. Please book to confirm.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                setShowAvailability(false);
                handleShow(selectedResort);
              }}
            >
              Book Now
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowAvailability(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Enhanced Comparison Modal */}
      <Modal show={showCompare} onHide={() => setShowCompare(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Compare Resorts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Best Value: <strong>{getBestValue()?.name}</strong> (Rating/Price
            Ratio)
          </p>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th
                  onClick={() => sortCompareTable("name")}
                  style={{ cursor: "pointer" }}
                >
                  Feature{" "}
                  {compareSortField === "name"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                {compareResorts.map((resort) => (
                  <th key={resort.name}>{resort.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  onClick={() => sortCompareTable("type")}
                  style={{ cursor: "pointer" }}
                >
                  Type{" "}
                  {compareSortField === "type"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td key={resort.name}>{resort.type}</td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("rating")}
                  style={{ cursor: "pointer" }}
                >
                  Rating{" "}
                  {compareSortField === "rating"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.rating ===
                      Math.max(...compareResorts.map((r) => r.rating))
                        ? "best-value"
                        : ""
                    }
                  >
                    {resort.rating} <FaStar />
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("price")}
                  style={{ cursor: "pointer" }}
                >
                  Price/Night{" "}
                  {compareSortField === "price"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.price ===
                      Math.min(...compareResorts.map((r) => r.price))
                        ? "best-value"
                        : ""
                    }
                  >
                    ${resort.price}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Weather</td>
                {compareResorts.map((resort) => (
                  <td key={resort.name}>
                    {weatherData[resort.name] || "Loading..."}
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("availability")}
                  style={{ cursor: "pointer" }}
                >
                  Availability{" "}
                  {compareSortField === "availability"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.availability.length ===
                      Math.max(
                        ...compareResorts.map((r) => r.availability.length)
                      )
                        ? "best-value"
                        : ""
                    }
                  >
                    {resort.availability.length} dates
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("amenities")}
                  style={{ cursor: "pointer" }}
                >
                  Amenities{" "}
                  {compareSortField === "amenities"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.amenities.length ===
                      Math.max(...compareResorts.map((r) => r.amenities.length))
                        ? "best-value"
                        : ""
                    }
                  >
                    {resort.amenities.join(", ")}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Location</td>
                {compareResorts.map((resort) => (
                  <td key={resort.name}>{resort.location}</td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("reviews")}
                  style={{ cursor: "pointer" }}
                >
                  Reviews{" "}
                  {compareSortField === "reviews"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.reviews ===
                      Math.max(...compareResorts.map((r) => r.reviews))
                        ? "best-value"
                        : ""
                    }
                  >
                    {resort.reviews}
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("distanceFromAirport")}
                  style={{ cursor: "pointer" }}
                >
                  Distance from Airport (km){" "}
                  {compareSortField === "distanceFromAirport"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.distanceFromAirport ===
                      Math.min(
                        ...compareResorts.map((r) => r.distanceFromAirport)
                      )
                        ? "best-value"
                        : ""
                    }
                  >
                    {resort.distanceFromAirport} km
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("staffRating")}
                  style={{ cursor: "pointer" }}
                >
                  Staff Rating{" "}
                  {compareSortField === "staffRating"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.staffRating ===
                      Math.max(...compareResorts.map((r) => r.staffRating))
                        ? "best-value"
                        : ""
                    }
                  >
                    {resort.staffRating} <FaStar />
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("roomTypes")}
                  style={{ cursor: "pointer" }}
                >
                  Room Types{" "}
                  {compareSortField === "roomTypes"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.roomTypes.length ===
                      Math.max(...compareResorts.map((r) => r.roomTypes.length))
                        ? "best-value"
                        : ""
                    }
                  >
                    {resort.roomTypes.join(", ")}
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("buildingStyle")}
                  style={{ cursor: "pointer" }}
                >
                  Building Style{" "}
                  {compareSortField === "buildingStyle"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td key={resort.name}>{resort.buildingStyle}</td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("additionalFacilities")}
                  style={{ cursor: "pointer" }}
                >
                  Additional Facilities{" "}
                  {compareSortField === "additionalFacilities"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.additionalFacilities.length ===
                      Math.max(
                        ...compareResorts.map(
                          (r) => r.additionalFacilities.length
                        )
                      )
                        ? "best-value"
                        : ""
                    }
                  >
                    {resort.additionalFacilities.join(", ")}
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("roomSize")}
                  style={{ cursor: "pointer" }}
                >
                  Room Size (sq ft){" "}
                  {compareSortField === "roomSize"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.roomSize ===
                      Math.max(...compareResorts.map((r) => r.roomSize))
                        ? "best-value"
                        : ""
                    }
                  >
                    {resort.roomSize} sq ft
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("viewType")}
                  style={{ cursor: "pointer" }}
                >
                  View Type{" "}
                  {compareSortField === "viewType"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td key={resort.name}>{resort.viewType}</td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("interiorDesign")}
                  style={{ cursor: "pointer" }}
                >
                  Interior Design{" "}
                  {compareSortField === "interiorDesign"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td key={resort.name}>{resort.interiorDesign}</td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("bedCount")}
                  style={{ cursor: "pointer" }}
                >
                  Bed Count{" "}
                  {compareSortField === "bedCount"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.bedCount ===
                      Math.max(...compareResorts.map((r) => r.bedCount))
                        ? "best-value"
                        : ""
                    }
                  >
                    {resort.bedCount}
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("balcony")}
                  style={{ cursor: "pointer" }}
                >
                  Balcony{" "}
                  {compareSortField === "balcony"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={resort.balcony ? "best-value" : ""}
                  >
                    {resort.balcony ? "Yes" : "No"}
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("petPolicy")}
                  style={{ cursor: "pointer" }}
                >
                  Pet Policy{" "}
                  {compareSortField === "petPolicy"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.petPolicy.includes("Allowed") ? "best-value" : ""
                    }
                  >
                    {resort.petPolicy}
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("wifiSpeed")}
                  style={{ cursor: "pointer" }}
                >
                  Wi-Fi Speed (Mbps){" "}
                  {compareSortField === "wifiSpeed"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.wifiSpeed ===
                      Math.max(...compareResorts.map((r) => r.wifiSpeed))
                        ? "best-value"
                        : ""
                    }
                  >
                    {resort.wifiSpeed} Mbps
                  </td>
                ))}
              </tr>
              <tr>
                <td
                  onClick={() => sortCompareTable("diningOptions")}
                  style={{ cursor: "pointer" }}
                >
                  Dining Options{" "}
                  {compareSortField === "diningOptions"
                    ? compareSortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </td>
                {compareResorts.map((resort) => (
                  <td
                    key={resort.name}
                    className={
                      resort.diningOptions.length ===
                      Math.max(
                        ...compareResorts.map((r) => r.diningOptions.length)
                      )
                        ? "best-value"
                        : ""
                    }
                  >
                    {resort.diningOptions.join(", ")}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Room Preview</td>
                {compareResorts.map((resort) => (
                  <td key={resort.name}>
                    <Image
                      src={resort.roomImage}
                      alt={`${resort.name} room`}
                      thumbnail
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={exportToPDF} className="me-2">
            <FaDownload /> Export to PDF
          </Button>
          <Button variant="secondary" onClick={() => setShowCompare(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ResortSection;
