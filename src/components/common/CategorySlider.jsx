import Slider from "react-slick";
import { cuisinesData } from "../../data";
import { Link } from "react-router-dom";

const CategorySlider = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          centerMode: false,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className="categories-slider">
      {cuisinesData?.map((cuisine) => (
        <Link
          to={`recipes/cuisine/${cuisine?.type}`}
          key={cuisine?.type}
          className="cuisine-item"
        >
          <img src={cuisine?.image} />
          <p className="cuisine-item-name">{cuisine?.type}</p>
        </Link>
      ))}
    </Slider>
  );
};

export default CategorySlider;
