import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { useEffect, useState } from "react";
import "./ProductDetails.css";
import axios from "axios";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchProduct(id) {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setIsLoading(false);
    }

    fetchProduct(id);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const handleBuy = () => {
    handleAddToCart();
    navigate("/checkout");
  }

  return (
    <div className="Container d-flex flex-row mx-0 my-5 gap-4">
      <div className="col-1 d-flex flex-column gap-1 p-4 justify-content-center">
        {isLoading
          ? Array(5)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} height={60} width={60} />
              ))
          : Array(5).fill(
              <img className="slide" src={product.image} alt={product.title} />
            )}
      </div>

      <div className="col-3 main-image-container d-flex img-fluid justify-content-center align-items-center">
        {isLoading ? (
          <Skeleton height={400} width={300} />
        ) : (
          <img className="main-image" src={product.image} alt={product.title} />
        )}
      </div>

      <div className="col-5 m-2">
        {isLoading ? (
          <>
            <Skeleton height={40} width={300} />
            <Skeleton className="my-2" height={30} width={100} />
            <Skeleton className="" count={5} height={30} />
          </>
        ) : (
          <>
            <h1>{product.title}</h1>
            <p className="price">${product.price}</p>
            <p>
              Available at a lower price from other sellers that may not offer free
              Prime shipping. Brand: {product.brand}
            </p>
            <hr />
            <table>
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td>{product.brand}</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>{product.color}</td>
                </tr>
                <tr>
                  <td>Dimensions</td>
                  <td>{product.dimensions}</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{product.size}</td>
                </tr>
                <tr>
                  <td>Special Feature</td>
                  <td>{product.specialFeature}</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <h4>About this item</h4>
            <p>{product.description}</p>
          </>
        )}
      </div>

      <div className="col-2">
        <div className="card">
          <div className="card-body">
            {isLoading ? (
              <>
                <Skeleton height={30} width={100} />
                <Skeleton height={20} count={3} />
                <Skeleton height={40} width={150} />
                <Skeleton height={40} width={150} />
                <Skeleton count={4} />
              </>
            ) : (
              <>
                <h3>${product.price}</h3>
                <p className="small">
                  $485.46 Shipping & Import Charges to Palestinian
                </p>
                <p className="small">$365.32 delivery</p>
                <p className="smaller">
                  <LocationOnIcon style={{ fontSize: "small" }} /> Deliver to
                  Palestinian Territories
                </p>
                <p>In Stock</p>

                <select
                  className="form-select p-2"
                  aria-label="Default select example"
                >
                  <option selected>Quantity : 1</option>
                  <option value="1">2</option>
                  <option value="2">3</option>
                  <option value="3">4</option>
                </select>

                <button
                  className="btn btn-warning button my-2"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button className="btn orange button my-2" onClick={handleBuy}>Buy Now</button>

                <table className="smaller">
                  <tbody>
                    <tr>
                      <td>Ships from</td>
                      <td>Amazon.com</td>
                    </tr>
                    <tr>
                      <td>Sold by</td>
                      <td>Amazon.com</td>
                    </tr>
                    <tr>
                      <td>Returns</td>
                      <td>30-day refund/replacement</td>
                    </tr>
                    <tr>
                      <td>Payment</td>
                      <td>Secure transaction</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;