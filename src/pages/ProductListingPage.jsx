import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Spinner, Alert, Button } from 'react-bootstrap';
import { fetchProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';

export default function ProductListingPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [visibleProductsCount, setVisibleProductsCount] = useState(9);  
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = products.filter((product) => {
    const withinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    return withinPriceRange;
  });

  const showMoreProducts = () => {
    setVisibleProductsCount((prevCount) => prevCount + 9); 
  };

  if (status === 'loading') {
    return (
      <Container>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">Failed to load products, Please try again later!</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="my-4">All Products</h1>
      <Row>
        <Col md={3}>
          <h3>Filters</h3>
          <Form>
            <Form.Group>
              <Form.Label>Price Range</Form.Label>
              <Form.Control
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, e.target.value])}
              />
              <Form.Text>{`$0 - $${priceRange[1]}`}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Books</option>
                {/* more categories to be added later */}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col md={9}>
          <Row>
            {filteredProducts.length > 0 ? (
              filteredProducts.slice(0, visibleProductsCount).map((product) => (
                <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <p>No products found...</p>
              </Col>
            )}
          </Row>
          
          {visibleProductsCount < filteredProducts.length && (
            <div className="text-center">
              <Button onClick={showMoreProducts} className="my-4">
                Show More
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
