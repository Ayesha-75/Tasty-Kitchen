import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItem = props => {
  const {itemDetails} = props
  const {id, name, cuisine, userRating, imageUrl} = itemDetails
  const {rating, ratingColor, totalReviews} = userRating

  return (
    <Link to={`/restaurants-list/${id}`} className="underline">
      <li className="restaurant-item">
        <img src={imageUrl} alt="restaurant-img" className="rest-image" />
        <div className="rest-details">
          <h1 className="rest-name">{name}</h1>
          <h3 className="rest-type">{cuisine}</h3>
          <div className="rating-box">
            <AiFillStar color={ratingColor} />
            <span className="rating">{rating}</span>
            <span className="total-ratings">{`(${totalReviews} ratings)`}</span>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
