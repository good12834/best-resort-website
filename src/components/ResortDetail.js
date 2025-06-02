import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Image,
  Button,
  Modal,
  Form,
  ListGroup,
  Carousel,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaStar, FaComments } from "react-icons/fa";
import axios from "axios";

const resorts = {
  "paradise-beach": {
    name: "Paradise Beach Resort",
    description: "A luxurious beachfront escape with stunning ocean views.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    type: "Beach",
    tour: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: 4.8,
    price: 450,
    availability: ["2025-04-05", "2025-04-06", "2025-04-10"],
    amenities: ["Pool", "Spa", "Beach Access"],
    location: "Miami, FL",
    lat: 25.7617,
    lon: -80.1918,
    roomSize: 450,
    viewType: "Ocean View",
    interiorDesign: "Contemporary Chic",
    roomImage:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/631173185.jpg?k=20729b276453e864b442d7d47469c99358ae5aca7d765c46d6047cbb0a38609a&o=&hp=1",
    bedCount: 2,
    balcony: true,
    petPolicy: "Pets Allowed (Small, $50 fee)",
    wifiSpeed: 100,
    diningOptions: ["Fine Dining", "Beachfront Café"],
    reviews: [
      {
        author: "Alex P.",
        rating: 5,
        comment: "Perfect beach getaway! The staff was amazing.",
      },
      {
        author: "Sara M.",
        rating: 4,
        comment: "Great views, but the Wi-Fi could be faster.",
      },
    ],
    gallery: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/655821549.jpg?k=5dfec4822113187b63fc03fb3bae0461594cce1e3696e0e633bf7ed78b448a06&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/655821550.jpg?k=64d3e793e7bbaec541de1d51093866268b4a4a688e4ab4dd7974541d14ff19cd&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/497157542.jpg?k=e5ad4135b197d84bf27717a10d12f9867c57e68c44f89bb883f61e810178d3ec&o=&hp=1",
    ],
  },
  "mountain-haven": {
    name: "Mountain Haven",
    description: "Cozy cabins nestled in the mountains.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    type: "Mountain",
    tour: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: 4.6,
    price: 300,
    availability: ["2025-04-07", "2025-04-08", "2025-04-12"],
    amenities: ["Skiing", "Fireplace", "Hiking"],
    location: "Colorado Rockies",
    lat: 39.5501,
    lon: -105.7821,
    roomSize: 350,
    viewType: "Mountain View",
    interiorDesign: "Rustic Cozy",
    roomImage:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/615251469.jpg?k=5ada14088e1b7e3ae130f7c91828f96d3a1b6d18694cf8fd98685ac5a7d0a6ec&o=&hp=1",
    bedCount: 1,
    balcony: false,
    petPolicy: "No Pets Allowed",
    wifiSpeed: 50,
    diningOptions: ["Rustic Bistro"],
    reviews: [
      {
        author: "Mike T.",
        rating: 4.5,
        comment: "Loved the cozy vibe and hiking trails!",
      },
      {
        author: "Lisa R.",
        rating: 4,
        comment: "Peaceful, but no balcony was a downside.",
      },
    ],
    gallery: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/489095770.jpg?k=2b8836f098598789616f80253883f2b1b2dd8bd10f77c75902c64f966f4a5e8e&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/489097537.jpg?k=d73f26ce95db4e749b2b4b418708398e65bc650036159ff0cf7ce75b0500db40&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/489095474.jpg?k=6cf6ce6d7da516af1a8b051437e28f7fa338d14dcfef0698c476c36143308379&o=&hp=1",
    ],
  },
  "tropical-oasis": {
    name: "Tropical Oasis",
    description: "An all-inclusive tropical paradise.",
    image:
      "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    type: "Tropical",
    tour: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    rating: 4.9,
    price: 600,
    availability: ["2025-04-09", "2025-04-11", "2025-04-13"],
    amenities: ["All-Inclusive", "Pool", "Excursions"],
    location: "Puerto Vallarta, MX",
    lat: 20.6534,
    lon: -105.2253,
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
    reviews: [
      {
        author: "Carlos G.",
        rating: 5,
        comment: "All-inclusive was worth every penny!",
      },
      {
        author: "Emma W.",
        rating: 4.8,
        comment: "Amazing food and pet-friendly!",
      },
    ],
    gallery: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/57/7e/c6/5-foods-6.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/57/7e/4e/1-sushi-2.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/51/08/12/the-pool-deck.jpg?w=1000&h=-1&s=1",
    ],
  },
};

const ResortDetail = () => {
  const { resortId } = useParams();
  const resort = resorts[resortId];
  const [weather, setWeather] = useState("Loading...");

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeatherMap API key
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${resort.lat}&lon=${resort.lon}&units=metric&appid=${apiKey}`
        );
        setWeather(
          `${response.data.main.temp}°C, ${response.data.weather[0].description}`
        );
      } catch (error) {
        setWeather("Weather unavailable");
      }
    };
    if (resort) fetchWeather();
  }, [resort]);

  const handleShowBooking = () => setShowBookingModal(true);
  const handleCloseBooking = () => {
    setShowBookingModal(false);
    setFormData({ name: "", checkIn: "", checkOut: "", guests: 1 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Submitted:", { resort: resort.name, ...formData });
    alert(`Booking confirmed for ${resort.name}!`);
    handleCloseBooking();
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, { user: "You", message: chatMessage }]);
      setChatHistory((prev) => [
        ...prev,
        {
          user: "Support",
          message: "Thanks for your message! How can we assist you today?",
        },
      ]);
      setChatMessage("");
    }
  };

  if (!resort) {
    return (
      <Container className="my-5 text-center">
        <h2>Resort Not Found</h2>
        <p>Sorry, we couldn’t find the resort you’re looking for.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">{resort.name}</h1>
      <Row>
        <Col md={6}>
          <Image
            src={resort.image}
            alt={resort.name}
            fluid
            style={{ borderRadius: "10px" }}
          />
        </Col>
        <Col md={6}>
          <Card className="border-0">
            <Card.Body>
              <Card.Text>{resort.description}</Card.Text>
              <Card.Text>
                <strong>Type:</strong> {resort.type}
              </Card.Text>
              <Card.Text>
                <strong>Rating:</strong>{" "}
                <Badge bg="warning" text="dark">
                  {resort.rating} <FaStar />
                </Badge>
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ${resort.price}/night
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {resort.location}
              </Card.Text>
              <Card.Text>
                <strong>Weather:</strong> {weather}
              </Card.Text>
              <Card.Text>
                <strong>Amenities:</strong> {resort.amenities.join(", ")}
              </Card.Text>
              <Card.Text>
                <strong>Room Size:</strong> {resort.roomSize} sq ft
              </Card.Text>
              <Card.Text>
                <strong>View:</strong> {resort.viewType}
              </Card.Text>
              <Card.Text>
                <strong>Interior:</strong> {resort.interiorDesign}
              </Card.Text>
              <Card.Text>
                <strong>Beds:</strong> {resort.bedCount}
              </Card.Text>
              <Card.Text>
                <strong>Balcony:</strong> {resort.balcony ? "Yes" : "No"}
              </Card.Text>
              <Card.Text>
                <strong>Pet Policy:</strong> {resort.petPolicy}
              </Card.Text>
              <Card.Text>
                <strong>Wi-Fi:</strong> {resort.wifiSpeed} Mbps
              </Card.Text>
              <Card.Text>
                <strong>Dining:</strong> {resort.diningOptions.join(", ")}
              </Card.Text>
              <div className="d-flex flex-wrap">
                <Button
                  variant="primary"
                  onClick={handleShowBooking}
                  className="mt-3 me-2"
                >
                  Book Now
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowTourModal(true)}
                  className="mt-3 me-2"
                >
                  Virtual Tour
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowAvailabilityModal(true)}
                  className="mt-3"
                >
                  Check Availability
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Photo Gallery */}
      <Row className="mt-5">
        <Col>
          <h3>Photo Gallery</h3>
          <Carousel>
            {resort.gallery.map((photo, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={photo}
                  alt={`${resort.name} gallery ${index + 1}`}
                  style={{ height: "700px",  objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      {/* Room Preview */}
      <Row className="mt-4">
        <Col className="text-center">
          <Image
            src={resort.roomImage}
            alt={`${resort.name} room`}
            thumbnail
            style={{ maxWidth: "300px" }}
          />
          <p className="mt-2">Room Preview</p>
        </Col>
      </Row>

      {/* Map */}
      <Row className="mt-5">
        <Col>
          <h3>Location Map</h3>
          <iframe
            title={`${resort.name} Map`}
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0, borderRadius: "10px" }}
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${resort.lat},${resort.lon}&zoom=12`}
            allowFullScreen
          ></iframe>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row className="mt-5">
        <Col>
          <h3>Guest Reviews</h3>
          <ListGroup variant="flush">
            {resort.reviews.map((review, index) => (
              <ListGroup.Item key={index}>
                <strong>{review.author}</strong> - {review.rating}/5 <FaStar />
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={handleCloseBooking}>
        <Modal.Header closeButton>
          <Modal.Title>Book {resort.name} - VIP Package</Modal.Title>
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
                min={formData.checkIn || new Date().toISOString().split("T")[0]}
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
          <Button variant="secondary" onClick={handleCloseBooking}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Virtual Tour Modal */}
      <Modal
        show={showTourModal}
        onHide={() => setShowTourModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Virtual Tour: {resort.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="400"
            src={resort.tour}
            title="Virtual Tour"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p className="mt-3">
            Experience the luxury of {resort.name} from anywhere.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTourModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Availability Modal */}
      <Modal
        show={showAvailabilityModal}
        onHide={() => setShowAvailabilityModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Availability: {resort.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Available Dates:</h5>
          <ul>
            {resort.availability.map((date, index) => (
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
              setShowAvailabilityModal(false);
              handleShowBooking();
            }}
          >
            Book Now
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowAvailabilityModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Live Chat Modal */}
      <Button
        variant="primary"
        className="chat-btn"
        onClick={() => setShowChatModal(true)}
      >
        <FaComments /> Chat with Us
      </Button>
      <Modal
        show={showChatModal}
        onHide={() => setShowChatModal(false)}
        dialogClassName="chat-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Live Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="chat-history">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.user === "You" ? "user-message" : "support-message"
                }`}
              >
                <strong>{msg.user}:</strong> {msg.message}
              </div>
            ))}
          </div>
          <Form onSubmit={handleChatSubmit} className="mt-3">
            <Form.Group>
              <Form.Control
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Send
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ResortDetail;
