import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import img from '../img/image.png';
import api from '../config/api'; // API konfiguratsiya import
import { BsFilterLeft } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiOutlineXMark } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { CiSearch } from 'react-icons/ci';
import { Range, getTrackBackground } from 'react-range';
import { FaStar } from "react-icons/fa";
import FilterPage from '../components/FilterPage';

const MIN = 0;
const MAX = 50;

function ProductFilter() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Qidiruv uchun holat
  const [priceRange, setPriceRange] = useState([1, 50]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(2);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get('type');


  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      if (response.data && response.data.data) {
        setProducts(response.data.data);
      } else {
        console.error("Kutilmagan javob tuzilishi:", response);
      }
    } catch (error) {
      console.error("Mahsulotlarni yuklash xatosi:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await api.get('/categries'); // To'g'rilandi
      if (response.data) {
        setCategories(response.data);
      } else {
        console.error("Kutilmagan javob tuzilishi:", response);
      }
    } catch (error) {
      console.error("Kategoriyalarni yuklash xatosi:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Handle window resize to hide modal on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowModal(false); // Hide modal on larger screens
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute category counts using useMemo for performance optimization
  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach(product => {
      if (product.category && product.category._id) {
        counts[product.category._id] = (counts[product.category._id] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  // Filter products based on type and selected categories
  const filteredProducts = products.filter(product => {
    const matchesType = type ? product.type?.includes(type) : true;
    const matchesCategory = selectedCategories.length > 0 ? selectedCategories.includes(product.category?._id) : true;
    const matchesPrice = !isNaN(product.price) && product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesColor = selectedColors.length > 0 ? selectedColors.some(color => product.color?.includes(color)) : true;
    const matchesSize = selectedSizes.length > 0 ? selectedSizes.some(size => product.size?.includes(size)) : true; // Size filtri
    return matchesType && matchesCategory && matchesPrice && matchesColor && matchesSize;
  });



  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Sahifalar sonini hisoblash
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Sahifa o'zgartirish funksiyasi
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle filters or modal based on screen width
  const toggleFilters = () => {
    if (window.innerWidth < 768) {
      setShowModal(!showModal);
    } else {
      setShowFilters(!showFilters);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prevCategories => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter(id => id !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  const handleColorChange = (color) => {
    setSelectedColors(prevColors => {
      if (prevColors.includes(color)) {
        return prevColors.filter(c => c !== color);
      } else {
        return [...prevColors, color];
      }
    });
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prevSizes => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter(s => s !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };

  return (
    <div className='w-full flex justify-center my-7'>
      <div className='w-[95%] sm:w-[95%] md:w-[92%] lg:w-[80%]'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 mb-7'>
          <div className='flex w-full flex-col md:flex-row justify-between gap-2'>
            {/* Filter Toggle Button */}
            <div
              onClick={toggleFilters}
              className='flex items-center justify-center border rounded-[5px] gap-2 py-1 px-16 bg-[#17696A] text-white w-full md:w-auto cursor-pointer'
            >
              <BsFilterLeft className='text-2xl' />
              <p>{showFilters || showModal ? "Hide filters" : "Show filters"}</p>
            </div>

            {/* Sorting and Pagination */}
            <div className='flex md:w-[60%] lg:w-[69%] xl:w-[74%] justify-between'>
              <div className='flex justify-start gap-6 md:gap-[10%] lg:gap-[15%]'>
                <div className='border rounded-[5px] px-3'>
                  <select id="custom-select" className="outline-none w-28 md:w-28 py-[5px]">
                    <option>Popularity</option>
                    <option>Low - High Price</option>
                    <option>High - Low Price</option>
                    <option>Average Rating</option>
                    <option>A - Z Order</option>
                    <option>Z - A Order</option>
                  </select>
                </div>

                <div className='hidden sm:flex items-center gap-2 ml5'>
                  <p className='hidden lg:flex w-20'>Show page</p>
                  <div className='border rounded-[5px] px-3'>
                    <select id="" className="outline-none w-28 md:w-28 py-[5px]">
                      <option>12</option>
                      <option>24</option>
                      <option>48</option>
                      <option>72</option>
                      <option>96</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-end md:justify-end w-full md:w-auto'>
                1 2 3 ... 10 11
              </div>
            </div>
          </div>
        </div>



        {/* Modal for small screens */}
        {showModal && window.innerWidth < 768 && (
          <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center z-50'>
            <div className='bg-white py-4 px-7 rounded-lg w-[320px] max-w-md h-[100%] overflow-hidden'>
              <FilterPage
                showModal={showModal}
                setShowModal={setShowModal}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                filteredCategories={filteredCategories}
                categoryCounts={categoryCounts}
                MIN={MIN}
                MAX={MAX}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedCategories={selectedCategories}
                handleCategoryChange={handleCategoryChange}
                selectedColors={selectedColors}
                handleColorChange={handleColorChange}
                selectedSizes={selectedSizes}
                handleSizeChange={handleSizeChange}
              />
            </div>
          </div>
        )}

        {/* Filter sidebar for larger screens */}
        <div className={`flex ${showFilters ? 'gap-8' : 'gap-0'} md:flex-row`}>
          {showFilters && !showModal && (
            <aside className='h-fit sticky top-20 w-[239px] hidden md:flex flex-col'>
              <FilterPage
                showModal={showModal}
                setShowModal={setShowModal}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                filteredCategories={filteredCategories}
                categoryCounts={categoryCounts}
                MIN={MIN}
                MAX={MAX}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedCategories={selectedCategories}
                handleCategoryChange={handleCategoryChange}
                selectedColors={selectedColors}
                handleColorChange={handleColorChange}
                selectedSizes={selectedSizes}
                handleSizeChange={handleSizeChange}
              />
            </aside>
          )}

          {/* Products Grid */}
          <div className='flex-1'>
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <div className={`grid gap-5 grid-cols-2 ${showFilters ? 'sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : 'sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'}`}>
                {currentProducts.length > 0 ? (
                  currentProducts.map(product => (
                    <div key={product._id} className="w-full h-[350px] rounded-md overflow-hidden relative">
                      <img src={product.image || img} alt={product.title} className='w-full h-[260px] rounded-md object-cover' />
                      <div className='absolute right-3 bottom-[105px] bg-white p-[4px] rounded-2xl'>
                        <CiHeart className='text-[20px]' />
                      </div>
                      <div className='absolute text-yellow-300 top-3 right-3 flex'>
                        <FaStar className='text-[12px] mr-[1px]' />
                        <FaStar className='text-[12px] mr-[1px]' />
                        <FaStar className='text-[12px] mr-[1px]' />
                        <FaStar className='text-[12px] mr-[1px]' />
                        <FaStar className='text-[12px] mr-[1px]' />
                      </div>
                      <div className='p-2'>
                        <h2 className='text-[#424551] leading-4 h-9'>
                          {product.title.length > 27 ? `${product.title.substring(0, 27)}...` : product.title}
                        </h2>
                        <p className='text-[#1E212C] text-[20px] font-semibold'>${product.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products found in this category</p>
                )}
              </div>
            )}
            <div className='flex items-center justify-end w-full'>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 border ${currentPage === i + 1 ? 'bg-[#17696A] text-white' : 'bg-white text-[#17696A]'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductFilter;