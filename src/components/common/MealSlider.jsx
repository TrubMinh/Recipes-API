import Slider from "react-slick";
import { mealTypeData } from "../../data";
import { Link } from "react-router-dom";

const MealSlider = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className="meals-slider">
      {mealTypeData?.map((meal) => (
        <div key={meal?.type} className="meal-item-wrapper">
          <Link to={`recipes/meal/${meal?.type}`} className="meal-item">
            <img src={meal?.image} />
            <span className="meal-item-name">{meal?.type}</span>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default MealSlider;
