import styled from "styled-components";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react"
import '@coreui/coreui/dist/css/coreui.min.css'

const Carousel = () => {

    return (
        <Container>
            <CCarousel className="slider" transition="crossfade" interval={4000} controls indicators>
                <CCarouselItem>
                    <CImage className='image' src="https://myfitment.com/wp-content/uploads/2022/02/Where-To-Sell-Auto-Parts.jpg" alt="slide 3" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className='image' src="https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2021/08/06125648/Where-to-Buy-Car-Spare-Parts-in-Dubai-Cover-20210806.jpg" alt="slide 4" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className='image' src="https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2023/01/20100238/How-to-Choose-Quality-Spare-Parts-for-Your-Car-_-Cover-1-20-1-23.jpg" alt="slide 5" />
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
    opacity: 0.5;
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