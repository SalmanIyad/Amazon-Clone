import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserAccountPage from './pages/UserAccountPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const location = useLocation();

  const isAuthPage = () => {
    return location.pathname === '/signin' || location.pathname === '/signup';
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      {!isAuthPage() && <Header />}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<UserAccountPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>
      {!isAuthPage() && <Footer />}
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}
