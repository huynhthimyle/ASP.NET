import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductService from './../service/ProductService';
import CategoryService from './../service/CategoryService';

function Product() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [priceAlert, setPriceAlert] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productList = await ProductService.getList();
                console.log("Danh sách sản phẩm:", productList);
                setProducts(productList);
                setFilteredProducts(productList);

                const categoriesResponse = await CategoryService.getList();
                console.log("Danh sách danh mục:", categoriesResponse);

                const categoryList = Array.isArray(categoriesResponse)
                    ? categoriesResponse
                    : categoriesResponse?.data || [];

                setCategories([{ id: 'all', name: 'Tất cả danh mục' }, ...categoryList]);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = [...products];

        if (selectedCategory !== 'all') {
            filtered = filtered.filter((product) =>
                String(product.categoryId) === selectedCategory
            );
        }

        if (minPrice !== '' && maxPrice !== '') {
            filtered = filtered.filter(
                (product) => product.price >= minPrice && product.price <= maxPrice
            );
        }

        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        switch (sortOrder) {
            case 'asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'best_selling':
                filtered.sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, minPrice, maxPrice, searchTerm, sortOrder, products]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = value !== '' ? parseFloat(value) : '';

        if (name === 'minPrice') {
            setMinPrice(parsedValue);
            if (parsedValue !== '' && parsedValue > maxPrice) {
                setPriceAlert('Giá tối thiểu không thể lớn hơn giá tối đa!');
            } else {
                setPriceAlert('');
            }
        } else {
            setMaxPrice(parsedValue);
            if (parsedValue !== '' && parsedValue < minPrice) {
                setPriceAlert('Giá tối đa không thể nhỏ hơn giá tối thiểu!');
            } else {
                setPriceAlert('');
            }
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        setCurrentPage(1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };

    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Sản Phẩm</h1>
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar Filters */}
                    <div className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            {/* Category Filter */}
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh Mục</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`category-${category.id}`}
                                            value={category.id}
                                            checked={selectedCategory === String(category.id)}
                                            onChange={handleCategoryChange}
                                            className="text-yellow-600 focus:ring-yellow-500"
                                        />
                                        <label
                                            htmlFor={`category-${category.id}`}
                                            className="ml-2 text-gray-700 hover:text-yellow-600 cursor-pointer"
                                        >
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {/* Price Range Filter */}
                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Khoảng Giá</h3>
                            <div className="space-y-3">
                                <input
                                    type="number"
                                    name="minPrice"
                                    value={minPrice}
                                    onChange={handlePriceChange}
                                    placeholder="Giá tối thiểu (VNĐ)"
                                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <input
                                    type="number"
                                    name="maxPrice"
                                    value={maxPrice}
                                    onChange={handlePriceChange}
                                    placeholder="Giá tối đa (VNĐ)"
                                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                {priceAlert && <p className="text-sm text-red-500">{priceAlert}</p>}
                            </div>

                            {/* Search Filter */}
                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Tìm Kiếm</h3>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Tìm theo tên sản phẩm"
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            {/* Sort Filter */}
                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Sắp Xếp</h3>
                            <select
                                value={sortOrder}
                                onChange={handleSortChange}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="asc">Giá: Thấp đến Cao</option>
                                <option value="desc">Giá: Cao đến Thấp</option>
                                <option value="newest">Mới Nhất</option>
                                <option value="best_selling">Bán Chạy Nhất</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="lg:w-3/4">
                        <section id="latest-products">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentProducts.length > 0 ? (
                                    currentProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
                                        >
                                            <div className="relative w-full h-50">
                                                <img
                                                    src={`https://localhost:7192/images/${product.imageUrl}`}
                                                    alt={product.name}
                                                    className="object-cover w-full h-full"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                                    }}
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                                                <p className="text-yellow-600 font-semibold">
                                                    {formatPrice(product.price)} VNĐ
                                                </p>
                                                <button
                                                    onClick={() => handleProductClick(product.id)}
                                                    className="mt-3 w-full py-2 text-sm font-medium text-white bg-yellow-600 rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition"
                                                >
                                                    Xem Chi Tiết
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="col-span-full text-center text-gray-600 text-lg">
                                        Không có sản phẩm nào.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center mt-6 space-x-2">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 text-sm font-medium rounded transition ${currentPage === 1
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                                        }`}
                                >
                                    Đầu
                                </button>
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 text-sm font-medium rounded transition ${currentPage === 1
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                                        }`}
                                >
                                    Trang trước
                                </button>
                                <span className="px-4 py-2 text-sm text-gray-700">
                                    Trang {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 text-sm font-medium rounded transition ${currentPage === totalPages
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                                        }`}
                                >
                                    Trang sau
                                </button>
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 text-sm font-medium rounded transition ${currentPage === totalPages
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                                        }`}
                                >
                                    Cuối
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;