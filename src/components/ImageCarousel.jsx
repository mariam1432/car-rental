import { useState } from "react";

const ImageCarousel = ({
  images,
  mainImageHeight = "h-96",
  thumbnailSize = "h-20",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };
  const hasMultipleImages = images.length > 1;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Image with Arrows */}
      <div className={`relative ${mainImageHeight} w-full mb-4`}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-cover"
        />
        {hasMultipleImages ? (
          <div>
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 border-black border-2 bg-transparent bg-opacity-50 text-black p-2 rounded-full hover:bg-opacity-75 transition cursor-pointer"
              aria-label="Previous image"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 border-black border-2 bg-transparent bg-opacity-50 text-black p-2 rounded-full hover:bg-opacity-75 transition cursor-pointer"
              aria-label="Next image"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      {hasMultipleImages ? (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => goToImage(index)}
              className={`cursor-pointer ${thumbnailSize} w-full relative overflow-hidden transition-all ${
                currentIndex === index ? "ring-1 ring-black-500" : "opacity-70"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageCarousel;
