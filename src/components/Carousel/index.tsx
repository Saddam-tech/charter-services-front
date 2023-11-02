import styled from "styled-components";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react"
import '@coreui/coreui/dist/css/coreui.min.css'
import banner0 from "assets/banners/banner0.webp";
import banner1 from "assets/banners/banner1.webp";
import banner2 from "assets/banners/banner2.webp";
import banner3 from "assets/banners/banner3.webp";

const Carousel = () => {

    return (
        <Container>
            <CCarousel className="slider" transition="crossfade" interval={4000} controls indicators>
                <CCarouselItem>
                    <CImage className='image' src={banner0} alt="slide 3" />asdfasdf
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className='image' src={banner1} alt="slide 4" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className='image' src={banner2} alt="slide 5" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className='image' src={banner3} alt="slide 5" />
                </CCarouselItem>
            </CCarousel>
        </Container>
    )
}

export default Carousel

const Container = styled.section`
  width: 100%;
  .slider {
    height: 100%;
    max-height: 650px;
    opacity: 0.8;
    overflow: hidden;
    @media screen and (max-width: 728px) {
      height: 100%;
    }
    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;

      @media screen and (max-width: 728px) {
        height: 400px;
      }
    }
  }
`