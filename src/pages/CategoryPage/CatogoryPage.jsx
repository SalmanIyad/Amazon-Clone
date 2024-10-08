import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import "./CategoryPage.css";

function CatogoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);

        if (response.status === 200) {
          const allProducts = response.data;
          const filteredProducts = allProducts.filter(product => product.category === category);
          setProducts(filteredProducts);
        } else {
          console.error("Error: Invalid response status", response.status);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProductsByCategory();
    }
  }, [category]);
  const [t, i18n] = useTranslation();
  return (
    <>
      <div className="col-12 d-flex flex-wrap  justify-content-center">
        <div className="col-2 d-flex flex-column p-4 my-4">
          <h5>{t('product.Department')}</h5>
          <h6>{category}</h6>
        </div>

        {loading ? (
          <div className="col-10 d-flex flex-wrap justify-content-center gap-2 my-4 ">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} width={256} height={350} />
            ))}
          </div>
        ) : (
          <div className="col-10 d-flex flex-wrap justify-content-center gap-2 my-4">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div
                  key={product.id}
                  className="card pCard d-flex flex-column justify-content-between"
                >
                  <img
                    src={product.image}
                    className="card-img-top-product "
                    alt={product.title}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{product.title}</h5>

                    <p className="card-text">
                      {product.description.substring(0, 30)}...
                    </p>
                    <p>
                      {t('product.FREE delivery to Palestinian Territories. Only 7 left in stock - order soon.')}
                    </p>

                    <div className="mt-auto d-flex flex-column ">
                      <div className="d-flex flex-row">
                        <p className="mb-2 fs-3 blod">${product.price}</p>
                        <p className="mx-2 line">
                          {t('product.list')} ${parseFloat((product.price + 10).toFixed(2))}
                        </p>
                      </div>
                      <Link to={`/product/${product.id}`}><button className="btn btn-warning addToCard "  >
                        {t('cart.Add to Cart')}
                      </button></Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CatogoryPage;
