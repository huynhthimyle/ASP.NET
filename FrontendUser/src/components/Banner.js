import React, { useState, useEffect } from 'react';
import BannerService from '../service/BannerService';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Slideshow = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await BannerService.getList();
        console.log("Banner data:", data);
        setSlides(data);
        setCurrentSlide(0);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Có lỗi khi lấy dữ liệu banner!");
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[600px] bg-gray-100 overflow-hidden">
      {/* Slideshow Content */}
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center w-full h-full text-red-500">
          <p>{error}</p>
        </div>
      ) : slides.length > 0 ? (
        <>
          <div
            className="relative flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div className="flex-shrink-0 w-full h-[600px]" key={index}>
                {slide.imageUrl ? (
                  <img
                    src={`https://localhost:7192/images/${slide.imageUrl}`}
                    alt={slide.name || `Slide ${index + 1}`}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/1200x600?text=Image+Not+Found';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No Image Available</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-yellow-100 transition"
            onClick={goToPrevSlide}
          >
            <FaChevronLeft className="w-5 h-5 text-gray-700 hover:text-yellow-600" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-yellow-100 transition"
            onClick={goToNextSlide}
          >
            <FaChevronRight className="w-5 h-5 text-gray-700 hover:text-yellow-600" />
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition ${currentSlide === index ? 'bg-yellow-600' : 'bg-gray-300'
                  }`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-500">
          <p>Không có banner nào để hiển thị.</p>
        </div>
      )}
    </div>
  );
};

export default Slideshow;