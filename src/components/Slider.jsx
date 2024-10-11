import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default function Slider() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Array of slide data with images and text
  const slides = [
    {
      title: "New In",
      subtitle: "Menswear 2021",
      image: "./src/assets/img/image.png",
      buttonText: "Shop the menswear",
      link: "shop-catalog.html",
    },
    {
      title: "New Collection",
      subtitle: "Fall-Winter 2021",
      image:
        "https://bouncemagazine.co.uk/wp-content/uploads/2020/08/young-man-wearing-demi-season-clothes-in-the-stree-PLWV9YE.jpg",
      buttonText: "Shop the collection",
      link: "shop-catalog.html",
    },
    {
      title: "Limited Edition",
      subtitle: "Leather Issue",
      image:
        "https://publish.purewow.net/wp-content/uploads/sites/2/2016/11/men-shouldnt-wear.jpg?fit=1360%2C886",
      buttonText: "Shop the collection",
      link: "shop-catalog.html",
    },
    {
      title: "Hottest Prices",
      subtitle: "Kidswear Sales",
      image:
        "https://xsuit.com/cdn/shop/articles/6_Can_t_Miss_Men_s_Fashion_Trends_for_2022.jpg?v=1653470643&width=1500",
      buttonText: "Shop sale now",
      link: "shop-catalog.html",
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className="relative overflow-hidden">
      <section className="relative overflow-hidden">
        <div className="relative group">
          {/* Left Arrow */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out transform group-hover:translate-x-0 -translate-x-8">
            <button
              type="button"
              onClick={prevSlide}
              className="bg-white text-black rounded-full p-2 shadow-lg"
            >
              <FaArrowLeftLong />
            </button>
          </div>

          {/* Right Arrow */}
          <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out transform group-hover:translate-x-0 translate-x-8">
            <button
              type="button"
              onClick={nextSlide}
              className="bg-white text-black rounded-full p-2 shadow-lg"
            >
              <FaArrowRightLong />
            </button>
          </div>

          {/* Single Active Slide */}
          <div className="overflow-hidden">
            <div
              className="w-full h-[600px] bg-cover bg-center py-16 transition-all ease-in-out duration-700"
              style={{
                backgroundImage: `url(${slides[activeSlide].image})`,
              }}
            >
              <div className="container mx-auto pl-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                  <div className="col-span-1">
                    {/* Title with individual animation */}
                    <h3
                      className="text-lg uppercase"
                      key={`title-${activeSlide}`}
                    >
                      {slides[activeSlide].title}
                    </h3>

                    {/* Subtitle with individual animation */}
                    <h2
                      className="text-5xl lg:text-6xl mb-8 pb-3 delay-150"
                      key={`subtitle-${activeSlide}`}
                    >
                      {slides[activeSlide].subtitle}
                    </h2>

                    {/* Button with individual animation */}
                    <div
                      className="mb-4 transform pl-3 scale-105 delay-300"
                      key={`button-${activeSlide}`}
                    >
                      <a
                        href={slides[activeSlide].link}
                        className="btn border-2 border-primary text-primary text-lg py-2 px-6 rounded-lg hover:bg-primary hover:text-white transition-all"
                      >
                        {slides[activeSlide].buttonText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pager */}
        <div className="container mx-auto relative mt-10">
          <div className="flex justify-center space-x-4">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`px-3 py-1 text-lg border ${
                  activeSlide === index
                    ? "border-primary text-primary"
                    : "border-gray-300 text-gray-500"
                } rounded-full`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
