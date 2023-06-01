import classNames from 'classnames/bind';
import { Virtual, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/bundle';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

type SlideProps = {
  className?: String;
  type?: 'heading' | 'villages' | 'products';
  autoPlay?: false | true;
  space: number | string | undefined;
  perView: number | 'auto' | undefined;
};

type Slide = {
  url: string;
}[];

const slides: Slide = [
  { url: 'https://toplist.vn/images/800px/lang-gom-bat-trang-814755.jpg' },
  {
    url: 'https://toplist.vn/images/800px/lang-tranh-dan-gian-dong-ho-30713.jpg',
  },
  { url: 'https://toplist.vn/images/800px/lang-lua-ha-dong-814765.jpg' },
  {
    url: 'https://toplist.vn/images/800px/lang-da-my-nghe-non-nuoc-392656.jpg',
  },
];

const Slider = ({ className, type, autoPlay, space, perView }: SlideProps) => {
  const between = Number(space);
  const per = Number(perView);

  return (
    <Swiper
      modules={[Virtual, Autoplay]}
      autoplay={
        autoPlay
          ? {
              delay: 3000,
              disableOnInteraction: false,
            }
          : false
      }
      breakpoints={{
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
          spaceBetween: between,
        },
        // when window width is >= 768px
        880: {
          slidesPerView: 2,
          spaceBetween: between * 0.6,
        },
        // when window width is >= 1040px
        1040: {
          slidesPerView: type === 'products' ? per - 1 : 2,
          spaceBetween: between * 0.7,
        },
        // when window width is >= 1440px
        1440: {
          slidesPerView: type === 'villages' ? per : per - 1,
          spaceBetween: between * 0.8,
        },
        // when window width is >= 1800px
        1680: {
          slidesPerView: perView,
          spaceBetween: between,
        },
      }}
      virtual
    >
      {slides.map((slide, index) => {
        switch (type) {
          case 'heading':
            return (
              <SwiperSlide key={index} virtualIndex={index}>
                <div style={{ objectFit: 'cover', height: '350px' }}>
                  <img
                    src={slide.url}
                    alt=""
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </SwiperSlide>
            );
          case 'villages':
            return (
              <SwiperSlide>
                <div className={cx('card-village')}>
                  <img src={slide.url} alt="" />
                  <p className={cx('title')}>
                    Xóm nghề đan đát rổ rế truyền thống ở xã Hòa Bình, huyện Chợ
                    Mới
                  </p>
                </div>
              </SwiperSlide>
            );
          case 'products':
            return (
              <SwiperSlide>
                <div className={cx('card-product')}>
                  <img src={slide.url} alt="" />
                  <p className={cx('title')}>Giỏ</p>
                </div>
              </SwiperSlide>
            );
          default:
            return null;
        }
      })}
    </Swiper>
  );
};

export default Slider;
