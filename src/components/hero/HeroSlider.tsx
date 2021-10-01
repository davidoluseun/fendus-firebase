import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import SliderNextButton from "./SliderNextButton";
import SliderPrevButton from "./SliderPrevButton";
import Slider01 from "../../images/slider01.jpg";
import Slider02 from "../../images/slider02.jpg";
import Slider03 from "../../images/slider03.jpg";
import Slider04 from "../../images/slider04.jpg";
import Slider05 from "../../images/slider05.jpg";
import Slider06 from "../../images/slider06.jpg";
import Slider07 from "../../images/slider07.jpg";
import Slider08 from "../../images/slider08.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderNextButton />,
    prevArrow: <SliderPrevButton />,
  };

  return (
    <Box
      className="hero-slider"
      flexGrow={1}
      overflow="hidden"
      borderRadius="md"
      bg="transparent"
    >
      <Slider {...settings}>
        <Box pb="60.125%" position="relative" className="hero-img-container">
          <Image
            top="0"
            left="0"
            borderRadius="md"
            position="absolute"
            alt=""
            src={Slider01}
          />
        </Box>
        <Box pb="60.125%" position="relative" className="hero-img-container">
          <Image
            top="0"
            left="0"
            borderRadius="md"
            position="absolute"
            alt=""
            src={Slider02}
          />
        </Box>
        <Box pb="60.125%" position="relative" className="hero-img-container">
          <Image
            top="0"
            left="0"
            borderRadius="md"
            position="absolute"
            alt=""
            src={Slider03}
          />
        </Box>
        <Box pb="60.125%" position="relative" className="hero-img-container">
          <Image
            top="0"
            left="0"
            borderRadius="md"
            position="absolute"
            alt=""
            src={Slider04}
          />
        </Box>
        <Box pb="60.125%" position="relative" className="hero-img-container">
          <Image
            top="0"
            left="0"
            borderRadius="md"
            position="absolute"
            alt=""
            src={Slider05}
          />
        </Box>
        <Box pb="60.125%" position="relative" className="hero-img-container">
          <Image
            top="0"
            left="0"
            borderRadius="md"
            position="absolute"
            alt=""
            src={Slider06}
          />
        </Box>
        <Box pb="60.125%" position="relative" className="hero-img-container">
          <Image
            top="0"
            left="0"
            borderRadius="md"
            position="absolute"
            alt=""
            src={Slider07}
          />
        </Box>
        <Box pb="60.125%" position="relative" className="hero-img-container">
          <Image
            top="0"
            left="0"
            borderRadius="md"
            position="absolute"
            alt=""
            src={Slider08}
          />
        </Box>
      </Slider>
    </Box>
  );
};

export default HeroSlider;
