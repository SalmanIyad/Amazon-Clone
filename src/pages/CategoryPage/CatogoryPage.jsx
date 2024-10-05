import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useParams } from "react-router-dom";

function CatogoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://localhost:5000/products/category/${category}`
        );
        const productsData = response.data;
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching Category:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProductsByCategory();
    }
  }, [category]);

  return (
    <>
      <div className="navBar d-flex justify-content-end  ">
        <div>
          <select className="form-select  " aria-label="Default select example">
            <option selected>Sort By: featured</option>
            <option value="featured">featured</option>
            <option value="Pric : Low to High">Pric : Low to High</option>
            <option value="Price : High to Low">Price : High to Low</option>
            <option value="Avg. Customer Review">Avg. Customer Review</option>
            <option value="Best sellers">Best sellers</option>
          </select>
        </div>
      </div>

      <div className="col-12 d-flex flex-wrap  justify-content-center">
        <div className="col-2 d-flex flex-column p-4 my-4">
          <h5>Department</h5>
          <h6>{category}</h6>
        </div>

        {loading ? (
          <div className="col-10 d-flex flex-wrap justify-content-center gap-2 my-4 ">
            {[...Array(8)].map((index) => (
              <Skeleton key={index} width={256} height={350} />
            ))}
          </div>
        ) : (
          <div className="col-10 d-flex flex-wrap justify-content-center  gap-2 my-4">
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
              >
                <div
                  key={product.id}
                  className="card pCard d-flex flex-column justify-content-between "
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
                      FREE delivery to Palestinian Territories Only 7 left in
                      stock - order soon.
                    </p>

                    <div className="mt-auto d-flex flex-column ">
                      <div className="d-flex flex-row">
                        <p className="mb-2 fs-3 blod">${product.price}</p>
                        <p className="mx-2 line">
                          list: ${parseFloat((product.price + 10).toFixed(2))}
                        </p>
                      </div>
                     <Link to={`/product/${product.id}`}><button  className="btn btn-warning addToCard "  >
                        Add to cart
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
