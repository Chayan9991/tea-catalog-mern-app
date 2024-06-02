import { Link } from 'react-router-dom';

const CategoryCard = ({ item }) => {
  return (
    <div className="category-card mb-4 justify-content-center">
      <Link to={`/product/${item._id}`} className="card-link text-decoration-none">
        <div className="container pt-2">
          <img src={`http://localhost:5000/${item.imageUrl}`} className="prod-card-img" alt={item.name} />
          <div className="card-body mt-3">
            <p className="prod-font text-center">
              <p className="" style={{fontWeight: "600"}}>{item.name}</p>
              <p className="text-center small text-muted">From ₹{item.price}</p>
            </p>
          </div>
        </div>
      </Link>
    </div>

  );
};

export default CategoryCard;
