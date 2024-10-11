import React, { useEffect, useState, useMemo } from 'react';
import { useSession } from "@clerk/clerk-react";
import { useLocation } from 'react-router-dom';
import img from '../img/image.png';
import api from '../config/api'; // API konfiguratsiya import
import { BsFilterLeft } from "react-icons/bs";
import isNotProdacts from "../img/image copy.png";
import { CiHeart } from "react-icons/ci";
import { CiSquareChevRight } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import FilterPage from '../components/FilterPage';
import { CiSquareChevLeft } from "react-icons/ci";
import Loading from '../components/Loading';
import Servise from '../config/service';

const MIN = 0;
const MAX = 50;

function ProductFilter() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryloading, setCategoryloading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([1, 50]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(2);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brandSearchTerm, setBrandSearchTerm] = useState('');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get('category');
  const type = params.get('type');


  const { session } = useSession();


  console.log(session);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await Servise.fetchProductss();
      if (response.data) {
        setProducts(response.data);
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
      const response = await Servise.fetchCategories();
      if (response) {
        setCategories(response);
      } else {
        console.error("Kutilmagan javob tuzilishi:", response);
      }
    } catch (error) {
      console.error("Kategoriyalarni yuklash xatosi:", error.message);
    } finally {
      setCategoryloading(false)
    }
  };


  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  console.log(selectedCategory);
  const addToBasket = async (productId, count = 1) => {
    try {
      const token = await session.getToken();
      console.log(token);
      const response = await api.post(
        '/basket/add',
        { productId, count },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (response.status === 201) {
        console.log("Mahsulot basketga qo'shildi:", response?.data);
      }
    } catch (error) {
      console.error("Mahsulotni basketga qo'shishda xato:", error.message);
    }
  };

  const handleAddToBasket = (productId) => {
    addToBasket(productId, 1);
  }

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

  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach(product => {
      if (product.category && product.category._id) {
        counts[product.category._id] = (counts[product.category._id] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const uniqueBrands = useMemo(() => {
    const brands = products.map(product => product.brand).filter(Boolean); // Ensure no null brands
    return [...new Set(brands)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSelectCategory = selectedCategory ? product.category?.name?.toLowerCase() === selectedCategory.toLowerCase() : true;
      const matchesType = type ? product.type?.includes(type) : true;
      const matchesCategory = selectedCategories.length > 0 ? selectedCategories.includes(product.category?._id) : true;
      const matchesPrice = !isNaN(product.price) && product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesColor = selectedColors.length > 0 ? selectedColors.some(color => product.color?.includes(color)) : true;
      const matchesSize = selectedSizes.length > 0 ? selectedSizes.some(size => product.size?.includes(size)) : true;
      const matchesBrand = selectedBrand.length > 0 ? selectedBrand.includes(product.brand) : true;

      return matchesSelectCategory && matchesType && matchesCategory && matchesPrice && matchesColor && matchesSize && matchesBrand;
    });
  }, [products, selectedCategory, type, selectedCategories, priceRange, selectedColors, selectedSizes, selectedBrand]);



  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

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

  const filteredBrands = useMemo(() => {
    return uniqueBrands.filter(brand =>
      brand.toLowerCase().includes(brandSearchTerm.toLowerCase())
    );
  }, [uniqueBrands, brandSearchTerm]);

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

  // Handle brand checkbox change
  const handleBrandChange = (event, brand) => {
    if (event.target.checked) {
      // Add the brand to the selectedBrand array
      setSelectedBrand(prevBrands => [...prevBrands, brand]);
    } else {
      // Remove the brand from the selectedBrand array
      setSelectedBrand(prevBrands => prevBrands.filter(selected => selected !== brand));
    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'; // Sahifaning skrolini bloklash
    } else {
      document.body.style.overflow = 'auto'; // Skrolni tiklash
    }

    return () => {
      document.body.style.overflow = 'auto'; // Component o'chirilganda skrolni tiklash
    };
  }, [showModal]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    // Agar currentProducts bo'sh bo'lsa va currentPage 1 dan katta bo'lsa, currentPage ni 1 ga o'zgartiring
    if (currentProducts.length === 0) {
      setCurrentPage(1);
    }
  }, [currentPage, currentProducts, totalPages]);


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
                  <p className='hidden lg:flex w-[70px]'>Show per</p>
                  <div className='border rounded-[5px] px-3'>
                    <select
                      id=""
                      className="outline-none w-20 md:w-10 py-[5px]"
                      value={productsPerPage}
                      onChange={(e) => setProductsPerPage(Number(e.target.value))}
                    >
                      <option value={2}>2</option>
                      <option value={24}>24</option>
                      <option value={48}>48</option>
                      <option value={72}>72</option>
                      <option value={96}>96</option>
                    </select>
                  </div>
                  <p className='hidden lg:flex w-9'>page</p>
                </div>
              </div>
              <div className='flex items-center'>
                <div className='flex items-center w-full'>
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className=""
                  >
                    <CiSquareChevLeft className='text-3xl text-[#17696A] hover:text-[#03CEA4]' />
                  </button>
                  <p>Page {currentPage} ... {totalPages}</p>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className=""
                  >
                    <CiSquareChevRight className='text-3xl text-[#17696A] hover:text-[#03CEA4]' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for small screens */}
        {showModal && window.innerWidth < 768 && (
          <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center z-50 '>
            <div className='bg-white py-4 px-7 rounded-lg w-[320px] max-w-md h-full overflow-hidden overflow-y-auto custom-scroll'>
              <div className='h-full '> {/* Bu joyga skrol qo'shildi */}
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
                  setBrandSearchTerm={setBrandSearchTerm}
                  brandSearchTerm={brandSearchTerm}
                  filteredBrands={filteredBrands}
                  selectedBrand={selectedBrand}
                  handleBrandChange={handleBrandChange}
                  categoryloading={categoryloading}
                  loading={loading}
                />
              </div>
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
                setBrandSearchTerm={setBrandSearchTerm}
                brandSearchTerm={brandSearchTerm}
                filteredBrands={filteredBrands}
                selectedBrand={selectedBrand}
                handleBrandChange={handleBrandChange}
                categoryloading={categoryloading}
                loading={loading}
              />
            </aside>
          )}

          {/* Products Grid */}
          <div className='w-[100%] flex-1 h-fit sticky top-20'>
            {loading ? (
              <div className='w-[100%] flex items-center justify-center mt-32 mb-32'>
                <div className=''>
                  <Loading />
                </div>
              </div>
            ) : (
              <div className={`grid gap-1  grid-cols-2 ${showFilters ? 'sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : 'sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'}`}>
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
                        <button onClick={() => handleAddToBasket(product._id)}>
                          Basketga qo'shish
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='max-w-full grid place-items-center h-full'>
                    <img src={isNotProdacts} alt="Is not products" className="mx-auto" />
                    <p className='font-semibold text-center'>Biz siz qidirayotgan narsani topa olmadik</p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductFilter;