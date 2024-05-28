import { Link } from 'react-router-dom';

const CategoryCard = ({ item }) => {
  return (
    <div className="category-card mb-4 justify-content-center">
      <Link to={`/productCategory/${item.id}`} className="card-link text-decoration-none">
        <div className="container pt-2">
          <img src={item.image} className="prod-card-img" alt={item.title} />
          <div className="card-body mt-3">
            <p className="prod-font text-center">
              <p className="" style={{fontWeight: "600"}}>{item.title}</p>
              <p className="text-center small text-muted">From ₹{item.price}</p>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
