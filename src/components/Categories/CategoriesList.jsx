import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./CategoriesList.css"; 

function CategoriesList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`);
        const productData = response.data;
        setProducts(productData);

        const uniqueCategories = [
          ...new Set(productData.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const Loadingcase = () => {
    return (
      <div className="d-flex flex-column gap-3">
        <Skeleton height={50} width={300} className="skeleton" />
        <Skeleton height={50} width={300} className="skeleton" />
        <Skeleton height={50} width={300} className="skeleton" />
        <Skeleton height={50} width={300} className="skeleton" />
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        <Loadingcase />
      ) : (
        categories.map((category, index) => (
          <Link
            to={`/category/${category}`}
            key={index}
            style={{ width: "100%" }}
          >
            <button className="btn-category">
              {category}
            </button>
          </Link>
        ))
      )}
    </div>
  );
}

export default CategoriesList;
