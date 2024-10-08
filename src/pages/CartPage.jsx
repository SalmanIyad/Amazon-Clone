import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { removeFromCart, updateQuantity } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/slices/productsSlice";
import { useEffect } from "react";
import { addToCart } from "../store/slices/cartSlice";
import { useTranslation } from "react-i18next";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    const newQuantity = Math.min(parseInt(quantity), 10);
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (!existingItem || existingItem.quantity < 10) {
      dispatch(addToCart(product));
    } else {
      alert("Maximum quantity of 10 reached for this item.");
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [t, i18n] = useTranslation();

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={8} md={12}>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.7rem",
                marginBottom: "15px",
              }}
            >
              {t('cart.Shopping Cart')}
            </div>

            {cartItems.length === 0 ? (
              <p>{t('cart.Your Amazon Cart is empty.')}</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex flex-column flex-md-row justify-content-between mb-3 pb-3 border-bottom"
                >
                  <div className="d-flex flex-column flex-md-row">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fluid
                      className="mb-2 mb-md-0 p-4"
                      style={{ maxWidth: "150px", marginRight: "2rem", alignItems:"center"}}
                    />
                    <div className="flex-grow-1">
                      <Link
                        to={`/product/${item.id}`}
                        style={{
                          fontSize: "1.2rem",
                          color: "#007185",
                          textDecoration: "none",
                        }}
                      >
                        {item.title}
                      </Link>
                      <div className="mt-2">
                        <span style={{ color: "green" }}>{t('cart.In Stock')}</span>
                      </div>
                      <div className="mt-1">
                        <small>Style: Without Camera</small>
                      </div>
                      <div className="mt-1">
                        <label
                          htmlFor={`qty-${item.id}`}
                          className="form-label"
                        >
                          {t('cart.Qty')}
                        </label>
                        <select
                          id={`qty-${item.id}`}
                          className="form-select form-select-sm"
                          style={{ width: "60px" }}
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(item.id, e.target.value)
                          }
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-2">
                        <Link
                          to="#"
                          className="text-muted"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                       {t('cart.Delete')}
                        </Link>{" "}
                        |{" "}
                        <Link to="#" className="text-muted">
                       {t('cart.Save for later')}
                        </Link>{" "}
                        |{" "}
                        <Link to="#" className="text-muted">
                          {t('cart.Compare with similar items')}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      margin:"1rem"
                    }}
                  >
                    ${item.price}
                  </div>
                </div>
              ))
            )}
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem",
                textAlign: "center",
              }}
            >
             {t('cart.Subtotal')}({cartItems.length} {t('cart.items')}): ${total.toFixed(2)}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#565959",
                marginTop: "10px",
              }}
            >
       {t('cart.paragraph')}
            </div>
          </div>
        </Col>

        <Col lg={4} md={12}>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              padding: "20px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
              {t('cart.Subtotal')} ({cartItems.length} items): ${total.toFixed(2)}
            </div>
            <Link
              to={"/checkout"}
            >
              <Button
              className="btn-radius mt-3"
              style={{
                backgroundColor: "#ffd814",
                borderColor: "#fcd200",
                color: "black",
                fontWeight: "bold",
                width: "100%",
              }}
              to={"/checkout"}
            >
              {t('cart.Proceed to Checkout')}
            </Button>
            </Link>
            <div className="mt-3">
              <input type="checkbox" id="gift" />
              <label
                htmlFor="gift"
                className="ml-2"
                style={{ fontSize: "0.9rem" }}
              >
                {" "}
                {t('cart.This order contains a gift')}{" "}
              </label>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              padding: "20px",
            }}
          >
            <h5>{t('cart.Pair with your cart')}</h5>
            {products.length > 0 ? (
              products.slice(0, 3).map((product) => (
                <>
                  <hr />
                  <div
                    key={product.id}
                    className="d-flex flex-column flex-md-row align-items-start mb-3 p-1"
                  >
                    <Link to={`/product/${product.id}`}>
                      <Image
                        src={product.image}
                        alt={product.title}
                        style={{
                          maxWidth: "80px",
                          maxHeight: "100px",
                          marginRight: "10px",
                        }}
                      />
                    </Link>
                    <div className="flex-grow-1">
                      <Link
                        to={`/product/${product.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          style={{
                            fontSize: "0.95rem",
                            color: "#007185",
                            marginBottom: "5px",
                          }}
                        >
                          {product.title}
                        </div>
                        <div style={{ fontWeight: "bold", color: "#b12704" }}>
                          {product.price}$
                        </div>
                      </Link>
                      <Button
                        className="btn-radius"
                        onClick={() => handleAddToCart(product)}
                        style={{
                          backgroundColor: "#ffd814",
                          borderColor: "#fcd200",
                          color: "black",
                          fontSize: "0.9rem",
                          marginTop: "10px",
                          borderRadius: "3rem",
                        }}
                      >
                     {t('cart.Add to Cart')}
                      </Button>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <p>Loading recommendations...</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
