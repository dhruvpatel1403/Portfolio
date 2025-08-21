import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function ContactSection() {
  const [hover, setHover] = useState(false);

  return (
    <div className="container py-5">
      <h2
        className="fw-bold mb-4 text-center"
        style={{ color: "#182848" }}
      >
        Contact <span style={{ color: "#0396ff" }}>Me</span>
      </h2>

      <Card
        className="shadow-lg border-0 rounded-4 p-4"
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          transition: "all 0.3s ease",
          cursor: "pointer",
          transform: hover ? "scale(1.03)" : "scale(1)",
          boxShadow: hover
            ? "0 10px 25px rgba(0,0,0,0.15)"
            : "0 4px 12px rgba(0,0,0,0.08)",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Subject" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Write your message..." required />
            </Form.Group>

            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                className="px-5 py-2 rounded-pill"
              >
                Send Message
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
