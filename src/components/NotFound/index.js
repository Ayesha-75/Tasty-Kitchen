import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1704877228/Layer_2nf_hb1hl2.png"
      alt="not found"
      className="not-found-img"
    />

    <h1>Page Not Found</h1>
    <p>we are sorry, the page you requested could not be found.</p>
    <p>Please go back to the homepage</p>
    <Link to="/">
      <button className="home-page-btn" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
