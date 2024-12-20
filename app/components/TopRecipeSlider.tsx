'use client';
import { DisplayRecipe } from '@/constants/interface';
import { CSSProperties, memo } from 'react';
import {  Pagination, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import OptImage from './ElementComponents/Image';
import Link from 'next/link';

export default memo(function TopRecipeSlider({
  recipes, 
}:{
  recipes:Array<DisplayRecipe>, 
}) {

  return (
      <div className='relative'>
          <Swiper
              className='w-full lg:w-[768px] h-[200px] md:h-[370px] lg:h-[400px]'
              modules={[ Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            speed={1000}
              >
              {
                  recipes.map((img, idx) => {
                      return (
                          <SwiperSlide key={idx} className="relative">
                              <Link href={"/recipe/show/" + img.recipe_id}>
                                <OptImage resize fit='cover' loading='eager' width={1024} height={768} key={idx} src={img.recipe_image} className="object-cover relative h-[100%] rounded-[0px] w-[100%] max-w-none"   alt="website banner" />
                              </Link>
                          </SwiperSlide>
                      )
                  })
              }
          </Swiper>
      </div>
  )
});