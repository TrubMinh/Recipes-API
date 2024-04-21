import { Link } from "react-router-dom";
import { logo } from "../../utils/images";
import { footerLinksData } from "../../data";
import PropTypes from "prop-types";
import { BsPinterest } from "react-icons/bs";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="site_logo" width={60} />
            <p className="navbar-brand-text">
              find<span className="text-orange">Recipe.</span>
            </p>
          </Link>
        </div>
        <div className="footer-links">
          {footerLinksData?.map((link, index) => (
            <Link key={index}>{link.linkName}</Link>
          ))}
        </div>

        <div className="footer-bottom">
          <SocialLink to="/" icon={<AiFillFacebook />} />
          <SocialLink to="/" icon={<AiOutlineTwitter />} />
          <SocialLink to="/" icon={<AiFillInstagram />} />
          <SocialLink to="/" icon={<AiFillYoutube />} />
          <SocialLink to="/" icon={<BsPinterest />} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const SocialLink = ({ to, icon }) => (
  <Link to={to} className="social-link">
    {icon}
  </Link>
);

SocialLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
