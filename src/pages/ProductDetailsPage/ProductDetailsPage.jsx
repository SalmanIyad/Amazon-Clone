import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ProductDetails.css";
import axios from "axios";
import StarRating from "../../components/StarRating";

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
  const [t, i18n] = useTranslation(); 

  return (
    <div className="Container d-flex flex-row mx-0 my-5 gap-4 p-3">
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

      <div className="col-3 main-image-container p-2 d-flex img-fluid justify-content-center align-items-center">
        {isLoading ? (
          <Skeleton height={400} width={300} />
        ) : (
          <img className="main-image " src={product.image} alt={product.title} />
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
            <div className="rating-container">
              <StarRating rating={product.rating.rate} />
              <p className="rating-count">(<strong>{product.rating.count}</strong> reviews)</p>
            </div>
            <p>
              {t('product.Available')} {product.brand}
            </p>
            <hr />
            <table>
              <tbody>
                <tr>
                  <td>{t('product.Brand')}  </td>
                  <td>Christopher Knight Home</td>
                </tr>
                <tr>
                  <td>{t('product.Color')}</td>
                  <td>White</td>
                </tr>
                <tr>
                  <td>{t('product.Dimensions')}</td>
                  <td>"28.5"D x 26.3"W x 31.75"H"</td>
                </tr>
                <tr>
                  <td>{t('product.Size')}</td>
                  <td>"	28.5D x 26.3W x 31.75H in"</td>
                </tr>
                <tr>
                  <td>{t('product.Special Feature')}</td>
                  <td>Arm Rest</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <h4>{t('product.About this item')}</h4>
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
                 {t('product.$485.46 Shipping & Import Charges to Palestinian')}
                </p>
                <p className="small">{t('product.$365.32 delivery')}</p>
                <p className="smaller">
                  <LocationOnIcon style={{ fontSize: "small" }} /> {t('product.Deliver to')}
                  {t('product.Palestinian Territories')}
                </p>
                <p>{t('cart.In Stock')}</p>

                <select
                  className="form-select p-2"
                  aria-label="Default select example"
                >
                  <option selected>{t('product.Quantity')} : 1</option>
                  <option value="1">2</option>
                  <option value="2">3</option>
                  <option value="3">4</option>
                </select>

                <button
                  className="btn button my-2"
                  style={{
                    backgroundColor: "#ffd814",
                    borderColor: "#fcd200",
                    color: "black",
                    borderRadius: "3rem"
                  }}
                  onClick={handleAddToCart}>
                  {t('cart.Add to Cart')}
                </button>
                <button className="btn orange button my-2" onClick={handleBuy}>{t('product.Buy Now')}</button>

                <table className="smaller my-4">
                  <tbody>
                    <tr>
                      <td>{t('product.Ships from')}</td>
                      <td>Amazon.com</td>
                    </tr>
                    <tr>
                      <td>{t('product.Sold by')}</td>
                      <td>Amazon.com</td>
                    </tr>
                    <tr>
                      <td>{t('product.Returns')}</td>
                      <td>{t('product.30-day refund/replacement')}</td>
                    </tr>
                    <tr>
                      <td>{t('product.Payment')}</td>
                      <td>{t('product.Secure transaction')}</td>
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