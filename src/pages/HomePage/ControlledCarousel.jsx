import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Categories from "../../components/Categories/Categories";

import Slide1 from "../../assets/SlideImg/Slide1.jpg";
import Slide2 from "../../assets/SlideImg/Slide2.jpg";
import Slide3 from "../../assets/SlideImg/Slide3.jpg";
import Slide4 from "../../assets/SlideImg/Slide4.jpg";
import Slide5 from "../../assets/SlideImg/Slide5.jpg";
import Slide6 from "../../assets/SlideImg/Slide6.jpg";
import Slide1Mb from "../../assets/SlideImg/Slide1Mb.jpg";
import Slide2Mb from "../../assets/SlideImg/Slide2Mb.jpg";
import Slide3Mb from "../../assets/SlideImg/Slide3Mb.jpg";
import Slide4Mb from "../../assets/SlideImg/Slide4Mb.jpg";
import Slide5Mb from "../../assets/SlideImg/Slide5Mb.jpg";
import Slide6Mb from "../../assets/SlideImg/Slide6Mb.jpg";

import "./HomePage.css";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="d-flex flex-column">
      <div className="carousel-container">
        <Carousel
          className="carousel-background d-none d-md-flex"
          activeIndex={index}
          onSelect={handleSelect}
        >
          <Carousel.Item>
            <img src={Slide1} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Slide2} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Slide3} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Slide4} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Slide5} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Slide6} alt="" />
          </Carousel.Item>
        </Carousel>

        <Carousel
          className="carousel-background d-md-none"
          activeIndex={index}
          onSelect={handleSelect}
        >
          <Carousel.Item>
            <img src={Slide1Mb} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Slide2Mb} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Slide3Mb} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Slide4Mb} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Slide5Mb} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Slide6Mb} alt="" />
          </Carousel.Item>
        </Carousel>

        <div className="categories">
          <Categories />
        </div>
      </div>
    </div>
  );
}

export default ControlledCarousel;
