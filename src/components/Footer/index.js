import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-heading-cont">
        <img
          src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1704893233/Frame_275whitecap_cdl3kb.png"
          alt="website-footer-logo"
          className="white-cap-img"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="para">
        The only thing we are serious about is food. Contact us on
      </p>

      <div className="icons-cont">
        <div testid="pintrest-social-icon">
          <FaPinterestSquare className="p-img" />
        </div>
        <div testid="instagram-social-icon">
          <FaInstagram className="p-img" />
        </div>
        <div testid="twitter-social-icon">
          <FaTwitter className="p-img" />
        </div>
        <div testid="facebook-social-icon">
          <FaFacebookSquare className="p-img" />
        </div>
      </div>
    </div>
  )
}
