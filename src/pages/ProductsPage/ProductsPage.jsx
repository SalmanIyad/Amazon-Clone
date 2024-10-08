import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import './ProductsPage.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured"); 
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/products');
        const productsData = response.data;
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching Products:", error);
      } 
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const sortedProducts = () => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "priceLowToHigh":
          return a.price - b.price;
        case "priceHighToLow":
          return b.price - a.price;
        case "customerReview":
          return b.rating?.rate - a.rating?.rate;
        case "bestSellers":
          return b.sold - a.sold; 
        default:
          return 0; 
      }
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  const [t, i18n] = useTranslation();
  return (
    <>
      <div className="navBar d-flex justify-content-end">
        <div>
          <select className="form-select" value={sortBy} onChange={handleSortChange}>
            <option value="featured">Sort By: Featured</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="customerReview">Avg. Customer Review</option>
            <option value="bestSellers">Best Sellers</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="col-12 d-flex flex-wrap justify-content-center gap-2 my-4">
          {[...Array(10)].map((_, index) => (
            <Skeleton key={index} width={256} height={350} />
          ))}
        </div>
      ) : (
        <div className="col-12 d-flex flex-wrap justify-content-center gap-3 my-4">
  {sortedProducts().map((product) => (
    <Link to={`/product/${product.id}`} key={product.id} className="text-decoration-none">
      <div className="card pCard d-flex flex-column border border-light shadow-sm" style={{ width: '250px', borderRadius: '8px' }}>
        <img
          src={product.image}
          className="card-img-top-product"
          alt={product.title}
          style={{ height: '200px', objectFit: 'contain', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
        />
        <div className="card-body d-flex flex-column justify-content-between" style={{ padding: '10px' }}>
          <h5 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{product.title}</h5>
          <p className="card-text" style={{ fontSize: '0.9rem', color: '#555' }}>
            {product.description.substring(0, 30)}...
          </p>
          <p style={{ fontSize: '0.9rem', color: '#777' }}>
            {t('cart.FREE delivery to Palestinian Territories. Only 7 left in stock - order soon.')}
          </p>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <p className="mb-0 fs-5 fw-bold">${product.price.toFixed(2)}</p>
              <p className="mx-2 text-muted text-decoration-line-through" style={{ fontSize: '0.9rem' }}>
                list: ${parseFloat((product.price + 10).toFixed(2))}
              </p>
            </div>
            <button className="btn btn-warning addToCard" style={{ borderRadius: '4px' }}>
             {t('cart.Add to Cart')}
            </button>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>

      )}
    </>
  );
}
