import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostService from '../service/PostService'; // Import service để gọi API
import { ApiImage } from '../api/ApiImage';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate(); // Khai báo useNavigate

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await PostService.getList();
                console.log("Posts from API:", result.posts); // Kiểm tra cấu trúc dữ liệu
                const sortedPosts = result.posts.sort((a, b) => a.id - b.id); // Sắp xếp theo ID từ nhỏ đến lớn
                setPosts(sortedPosts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };
        fetchPosts();
    }, []);

    const handleEdit = (id) => {
        // Chuyển hướng tới trang chỉnh sửa bài viết
        navigate(`/post/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
            try {
                const result = await PostService.delete(id);
                if (result.status) {
                    setPosts(posts.filter(post => post.id !== id));
                }
            } catch (error) {
                console.error("Failed to delete post:", error);
            }
        }
    };

    return (
        <div className="container p-6 mx-auto">
            <div className="mb-8 text-4xl font-bold text-center">Quản Lý Bài Viết</div>

            <div className="flex justify-end mb-4">
                <Link to="/postform">
                    <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                        Thêm Bài Viết
                    </button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-collapse border-gray-400 rounded-lg shadow-md">
                    <thead>
                        <tr className="text-center bg-gray-200 border-b border-gray-400">
                            <th className="px-6 py-3 text-gray-600 border border-gray-400">ID</th>
                            <th className="px-6 py-3 text-gray-600 border border-gray-400">Tiêu Đề</th>
                            <th className="px-6 py-3 text-gray-600 border border-gray-400">Topic_ID</th>
                            <th className="px-6 py-3 text-gray-600 border border-gray-400">Slug</th>
                            <th className="px-6 py-3 text-gray-600 border border-gray-400">Nội Dung</th>
                            <th className="px-6 py-3 text-gray-600 border border-gray-400">Hình Ảnh</th>
                            <th className="px-6 py-3 text-gray-600 border border-gray-400">Loại</th>
                            <th className="px-6 py-3 text-gray-600 border border-gray-400">Mô Tả</th>
                            <th className="px-6 py-3 text-gray-600 border border-gray-400">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <tr key={post.id} className="text-center border-b border-gray-400">
                                    <td className="px-4 py-3 text-gray-700 border border-gray-400">{post.id}</td>
                                    <td className="px-4 py-3 text-gray-700 border border-gray-400">{post.title}</td>
                                    <td className="px-4 py-3 text-gray-700 border border-gray-400">{post.topic_id}</td>
                                    <td className="px-4 py-3 text-gray-700 border border-gray-400">{post.slug}</td>
                                    <td className="px-4 py-3 text-gray-700 border border-gray-400">{post.content}</td>
                                    <td className="px-4 py-2 border">
                                        {post.thumbnail ? (
                                            <img
                                                src={`${ApiImage}/images/post/${post.thumbnail}`}
                                                alt={post.thumbnail}
                                                className="object-cover w-16 h-16 rounded-md"
                                            />
                                        ) : (
                                            <span>Không có ảnh</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-gray-700 border border-gray-400">{post.type}</td>
                                    <td className="px-4 py-3 text-gray-700 border border-gray-400">{post.description}</td>
                                    <td className="px-4 py-2 border">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => handleEdit(post.id)}
                                                className="text-yellow-500 hover:text-yellow-600"
                                                aria-label={`Edit ${post.title}`}
                                            >
                                                <FaEdit size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="text-red-500 hover:text-red-600"
                                                aria-label={`Delete ${post.title}`}
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="px-6 py-4 text-center text-gray-500">Không có bài viết nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Post;
