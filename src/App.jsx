import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import ProductListingPage from './pages/ProductsPage/ProductsPage';
import ProductDetailPage from './pages/ProductDetailsPage/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage'; 
import UserAccountPage from './pages/UserAccountPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import SearchPage from './pages/SearchPage/SearchPage';
import CheckEmailPage from './pages/CheckEmailPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CatogoryPage from './pages/CategoryPage/CatogoryPage';

const App = () => {
  const location = useLocation();

  const isAuthPage = () => {
    return location.pathname === '/signin' || location.pathname === '/signup';
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      {!isAuthPage() && <Navbar />}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CatogoryPage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<UserAccountPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/search/:searchQuery" element={<SearchPage />} />
          <Route path="/search/" element={<HomePage />} />
          <Route path="/checkemail" element={<CheckEmailPage/>}/>
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
