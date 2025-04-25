import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductService from '../service/ProductService';
import CategoryService from '../service/CategoryService';

function Sidebar() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResult = await ProductService.getList();
                setProducts(productResult.products || []);
                setFilteredProducts(productResult.products || []);
                
                const categoriesResponse = await CategoryService.getList();
                setCategories([{ id: 'all', name: 'Tất cả danh mục' }, ...(categoriesResponse.categories || [])]);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = products;
        if (selectedCategory !== 'all') {
            filtered = products.filter(product => String(product.category_id) === selectedCategory);
        }
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to page 1 on category change
    }, [selectedCategory, products]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value); // Only one selected category at a time
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex max-w-6xl px-4 py-6 mx-auto">
            <div className="w-1/5 p-6 mr-4 bg-gray-100 rounded-lg">
                <h3 className="mb-4 text-xl font-semibold text-primary">Danh mục</h3>
                {categories.map((category) => (
                    <div key={category.id} className="mb-3">
                        <label className="flex items-center text-gray-700">
                            <input
                                type="radio"
                                value={category.id}
                                checked={selectedCategory === String(category.id)}
                                onChange={handleCategoryChange}
                                className="mr-3 accent-primary"
                            />
                            {category.name}
                        </label>
                    </div>
                ))}
            </div>

            <section id="latest-products" className="w-4/5">
                <div className="flex flex-wrap -mx-2">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                            <div key={product.id} className="w-full px-4 mb-8 md:w-1/3">
                                <div className="relative p-6 transition-all bg-white shadow-lg cursor-pointer rounded-2xl hover:-translate-y-2">
                                    <div className="w-4/5 h-[250px] overflow-hidden mx-auto mb-4">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.name}
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <h3 className="m-5 text-lg font-extrabold text-gray-800">{product.name}</h3>
                                    <p className="mx-5 mb-2 text-sm text-gray-600">{product.category_name}</p>
                                    <h4 className="mx-5 mb-4 text-xl font-bold text-gray-800">
                                        ${product.pricebuy}
                                    </h4>
                                    <button
                                        onClick={() => handleProductClick(product.id)}
                                        className="block w-full py-2 mt-4 text-white transition-all">
                                        <div className='flex flex-row'>
                                            <div className="flex items-center justify-end m-0 basis-6/12 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                                                    <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                            <div className="flex justify-center m-1 basis-6/12">
                                                <Link to={`/product/${product.id}`} className="flex justify-center w-48 p-2 font-bold bg-blue-500 border-2 border-yellow-300 rounded-lg">
                                                    Add to cart
                                                </Link>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không tìm thấy sản phẩm nào.</p>
                    )}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`p-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500'} text-white rounded`}>
                        Trang trước
                    </button>
                    <span className="self-center">Trang {currentPage} trên {totalPages}</span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500'} text-white rounded`}>
                        Trang sau
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Sidebar;
