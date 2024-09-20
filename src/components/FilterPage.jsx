import React from 'react'
import { CiSearch } from 'react-icons/ci';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { HiOutlineXMark } from 'react-icons/hi2';
import { Range, getTrackBackground } from 'react-range';

function FilterPage({
    setShowModal,
    isCategoryOpen,
    setIsCategoryOpen,
    setSearchTerm,
    searchTerm,
    filteredCategories,
    categoryCounts,
    MIN,
    MAX,
    priceRange,
    setPriceRange,
    selectedCategories,
    isPriceOpen,
    handleCategoryChange,
    setIsPriceOpen
}) {
    return (
        <div>
            <div className='flex offcanvas-header items-center justify-between border-b pb-4 mb-4 md:hidden'>
                <h2 className='text-lg mb-0'>Do'kon filtrlari</h2>
                <button onClick={() => setShowModal(false)} className='text-[#17696A]'>
                    <HiOutlineXMark className='text-2xl' />
                </button>
            </div>
            <div className='border-b-[1px] pb-3'>
                <div className='flex items-center justify-between mb-1'>
                    <h1 className='font-semibold'>Kategoriyalar</h1>
                    <button
                        className='text-[#17696A]'
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)} // Div ochilishini boshqarish
                    >
                        {isCategoryOpen ? <FiMinus /> : <FiPlus />} {/* Ochiq bo'lsa - , yopiq bo'lsa + */}
                    </button>
                </div>

                <div
                    className={`transition-all duration-500 ease-in ${isCategoryOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Kategoriyalarni qidirish..."
                            className="border font-thin border-gray-300 rounded-md pl-4 pr-9 py-2 w-[100%] outline-[#17696A]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Qidiruv funksiyasi
                        />
                        <CiSearch className="w-5 h-5 absolute right-3 top-2.5 text-[#1E212C] cursor-pointer" />
                    </div>

                    {/* Filtrlash natijasi bo'yicha kategoriyalar */}
                    <div className="mt-2 pl-3 custom-scroll" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <div key={category._id} className='w-full flex items-center'>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category._id)}
                                        onChange={() => handleCategoryChange(category._id)}
                                        className='form-checkbox h-4 w-4 text-[#17696A]'
                                    />
                                    <h1 className='ml-2'>{category.name} ({categoryCounts[category._id] || 0})</h1>
                                </div>
                            ))
                        ) : (
                            <p>Kategoriyalar topilmadi</p>
                        )}
                    </div>
                </div>
            </div>
            <div className='border-b-[1px] pb-3'>
                <div className='flex items-center justify-between mt-3'>
                    <h1 className='font-semibold'>Price</h1>
                    <button
                        className='text-[#17696A]'
                        onClick={() => setIsPriceOpen(!isPriceOpen)} // Div ochilishini boshqarish
                    >
                        {isPriceOpen ? <FiMinus /> : <FiPlus />} {/* Ochiq bo'lsa - , yopiq bo'lsa + */}
                    </button>
                </div>
                <div className={`transition-all duration-500 ease-in ${isPriceOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    style={{ overflow: 'hidden' }}>
                    <div className='w-[85%] relative flex flex-col items-center ml-2 mt-9'>
                        <Range
                            step={1}
                            min={MIN}
                            max={MAX}
                            values={priceRange}
                            onChange={values => setPriceRange(values)}
                            renderTrack={({ props, children }) => {
                                const [minValue, maxValue] = priceRange;
                                const colors = minValue === maxValue
                                    ? ['#17696A', '#D0D0D0']
                                    : ['#17696A', '#17696A', '#D0D0D0'];

                                return (
                                    <div
                                        {...props}
                                        className='h-[2px] w-full bg-gray-200 rounded-lg'
                                        style={{
                                            ...props.style,
                                            background: getTrackBackground({
                                                values: priceRange,
                                                colors: colors,
                                                min: MIN,
                                                max: MAX,
                                            }),
                                        }}
                                    >
                                        {children}
                                    </div>
                                );
                            }}
                            renderThumb={({ props, value, index }) => (
                                <div
                                    {...props}
                                    className='relative w-3 h-3 bg-[#17696A] rounded-full outline-none'
                                    style={{ ...props.style }}
                                >
                                    <div
                                        className='absolute -top-7 px-4 flex items-center justify-center w-full h-6 bg-gray-800 text-white text-xs rounded'
                                    >
                                        ${value}
                                    </div>
                                </div>
                            )}
                        />
                        <div className="flex justify-between w-full mt-4">
                            <input
                                className='border border-[#dadbdd] rounded px-2 py-1 w-20 text-center outline-none'
                                type="number"
                                value={priceRange[0] === 0 ? "" : priceRange[0]} // Agar qiymat 0 bo'lsa, input bo'sh bo'ladi
                                placeholder="Min" // 0 bo'lganda placeholder ko'rinadi
                                onChange={(e) => {
                                    const value = +e.target.value;
                                    // Minimal qiymatni yangilash: qiymatni MAX bilan cheklash va maksimal qiymatdan katta bo'lishini oldini olish
                                    setPriceRange([Math.max(MIN, value), Math.min(priceRange[1], MAX)]);
                                }}
                            />
                            <span className='mx-2 border-t w-5 mt-4 border-[#17696A]'></span>
                            <input
                                className='border border-[#dadbdd] rounded px-2 py-1 w-20 text-center outline-none'
                                type="number"
                                value={priceRange[1] === 0 ? "" : priceRange[1]} // Agar qiymat 0 bo'lsa, input bo'sh bo'ladi
                                placeholder="Max" // 0 bo'lganda placeholder ko'rinadi
                                onChange={(e) => {
                                    const value = +e.target.value;
                                    // Maksimal qiymatni yangilash: qiymatni MIN bilan cheklash va minimal qiymatdan kichik bo'lishini oldini olish
                                    setPriceRange([Math.max(priceRange[0], MIN), Math.min(value, MAX)]);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterPage