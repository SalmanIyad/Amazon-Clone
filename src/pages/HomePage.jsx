import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { fetchProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  const [visibleProductsCount, setVisibleProductsCount] = useState(8);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const showMoreProducts = () => {
    setVisibleProductsCount((prevCount) => prevCount + 8);
  };

  return (
    <Container>
      <h1 className="my-4">Featured Products</h1>
      <Row>
        {products.slice(0, visibleProductsCount).map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      
      {visibleProductsCount < products.length && (
        <div className="text-center">
          <Button onClick={showMoreProducts} className="my-4">
            Show More
          </Button>
        </div>
      )}
    </Container>
  );
}
