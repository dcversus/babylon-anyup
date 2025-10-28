import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination } from 'swiper/modules';
import { Slide1_Intro } from './slides/Slide1_Intro';
import { Slide2_Examples } from './slides/Slide2_Examples';
import { Slide3_Demand } from './slides/Slide3_Demand';
import { Slide4_Solutions } from './slides/Slide4_Solutions';
import { Slide5_EdgeCraft } from './slides/Slide5_EdgeCraft';
import { Slide6_BabylonAnyup } from './slides/Slide6_BabylonAnyup';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './App.css';

function App() {
  return (
    <div className="app">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        keyboard={true}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Keyboard, Pagination]}
        className="swiper-container"
      >
        <SwiperSlide>
          <Slide1_Intro />
        </SwiperSlide>

        <SwiperSlide>
          <Slide2_Examples />
        </SwiperSlide>

        <SwiperSlide>
          <Slide3_Demand />
        </SwiperSlide>

        <SwiperSlide>
          <Slide4_Solutions />
        </SwiperSlide>

        <SwiperSlide>
          <Slide5_EdgeCraft />
        </SwiperSlide>

        <SwiperSlide>
          <Slide6_BabylonAnyup />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default App;
