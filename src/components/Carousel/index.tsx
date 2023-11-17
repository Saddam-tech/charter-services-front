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
        <CCarouselItem className="inner-wrap">
          <div className="text-wrap">
            <h1>End-to-End corporate solutions</h1>
            <p>With over 30 years of experience our dedicated account managers, advanced technology and luxury vehicle fleets ensure you'll have peace of mind for all your company's transportation needs.</p>
          </div>
          <CImage className='image' src={banner0} alt="slide 3" />
        </CCarouselItem>
        <CCarouselItem className="inner-wrap">
          <div className="text-wrap">
            <h1>Luxury Bus Charters For Any Event</h1>
            <p>If you need to move a few 100 or several 1,000s, with shuttles and vans for airport transfers, sightseeing tours, field trips, or other exclusive events, we'll help you create an unforgettable experience.</p>
          </div>
          <CImage className='image' src={banner1} alt="slide 4" />
        </CCarouselItem>
        <CCarouselItem className="inner-wrap">
          <div className="text-wrap">
            <h1>School Bus Transportation</h1>
            <p>Our latest transportation division now provides 5 efficient services for your schools. Our expert dispatch units ensure students are able to arrive at their school and back safely, conveniently, and on schedule.</p>
          </div>
          <CImage className='image' src={banner2} alt="slide 5" />
        </CCarouselItem>
        <CCarouselItem className="inner-wrap">
          <div className="text-wrap">
            <h1>End-to-End corporate solutions</h1>
            <p>With over 30 years of experience our dedicated account managers, advanced technology and luxury vehicle fleets ensure you'll have peace of mind for all your company's transportation needs.</p>
          </div>
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
    overflow: hidden;
    @media screen and (max-width: 728px) {
      height: 100%;
      max-height: 800px;
    }
    .inner-wrap {
      position: relative;
      .text-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.5);
        padding: 20px;
        width: 100%;
        position: absolute;
        h1 {
          font-size: 30px;
        }
        p {
          color: #ffffff;
          font-size: 20px;
        }
      }
      .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
  
        @media screen and (max-width: 728px) {
          height: 800px;
        }
      }
    }
  }
`