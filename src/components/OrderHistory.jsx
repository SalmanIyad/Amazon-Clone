import { useEffect, useState } from "react";
import { Alert, Card, Col, Row } from "react-bootstrap";

const OrderHistory = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders);
      } catch (error) {
        console.error("Error parsing orders:", error);
        setOrders(null);
      }
    }
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title style={{fontSize: "1.6rem"}}>Order History</Card.Title>
        {orders ? (
          orders.items && orders.items.length > 0 ? (
            orders.items.map((order, index) => (
              <Row key={index} className="mb-4">
                <hr style={{ backgroundColor: "#333", height: "3px" }} />
                <Col xs={12} md={8}>
                  <h5><strong>
                    Order #{index + 1}: {order.title} - ${order.price}
                  </strong></h5>
                  <hr />
                  <p>
                    Order to: <strong>{orders.shippingAddress.fullName}</strong>
                  </p>
                  <hr />
                  <h6>Shipping Address:</h6>
                  <p>
                    {orders.shippingAddress.address}, {orders.shippingAddress.city}, {orders.shippingAddress.postalCode}, {orders.shippingAddress.country}
                  </p>
                </Col>
                <Col xs={12} md={4} className="d-flex justify-content-center align-items-center">
                  <img src={order.image} alt={order.title} style={{ maxWidth: "100%", height: "auto", maxHeight: "200px" }} />
                </Col>

              </Row>
            ))
          ) : (
            <Alert variant="info">No orders</Alert>
          )
        ) : (
          <Alert variant="info">Loading...</Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default OrderHistory;
