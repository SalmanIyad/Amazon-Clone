import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './SearchPage.css';
import StarRating from "../../components/StarRating";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const { searchQuery } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching Products:", error);
      } finally {
        setLoading(false);
      }
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
          return b.rating?.rate - a.rating?.rate;
        default:
          return 0;
      }
    });
  };

  const filteredProducts = sortedProducts().filter((product) => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <>
      <div className="navBar d-flex justify-content-between align-items-center mb-4">
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
          {filteredProducts.length === 0 ? ( 
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
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
                    
                    <div className="rating-container">
                      <StarRating rating={product.rating.rate} />
                      <p className="rating-count">(<strong>{product.rating.count}</strong> reviews)</p>
                    </div>
                    <p className="card-text" style={{ fontSize: '0.9rem', color: '#555' }}>
                      {product.description.substring(0, 30)}...
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#777' }}>
                      FREE delivery to Palestinian Territories. Only 7 left in stock - order soon.
                    </p>
                    <div className="d-flex flex-column">
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <p className="mb-0 fs-5 fw-bold">${parseFloat(product.price).toFixed(2)}</p>
                        <p className="mx-2 text-muted text-decoration-line-through">
                          ${parseFloat((parseFloat(product.price) + (Math.random() * (15 - 5) + 5)).toFixed(2))}
                        </p>
                      </div>
                      <button className="btn addToCard" style={{
                          backgroundColor: "#ffd814",
                          borderColor: "#fcd200",
                          color: "black",
                          fontSize: "0.9rem",
                          borderRadius: "3rem",
                          marginTop: "1rem"
                        }}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </>
  );
}
