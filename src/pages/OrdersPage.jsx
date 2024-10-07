import { Container } from 'react-bootstrap';
import OrderHistory from '../components/OrderHistory';

const OrdersPage = () => {
  return (
    <Container className="mt-5">
        <OrderHistory/>
    </Container>
  )
}

export default OrdersPage;