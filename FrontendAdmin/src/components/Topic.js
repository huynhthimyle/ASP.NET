import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopicService from '../service/TopicService';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Topic = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      const result = await TopicService.getList();
      setTopics(result.topics);
    };
    fetchTopics();
  }, []);

  const handleEdit = (id) => {
    navigate(`/topic/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa chủ đề này không?')) {
      const result = await TopicService.delete(id);
      if (result.status) {
        setTopics(topics.filter(topic => topic.id !== id));
      }
    }
  };

  return (
    <div className="container px-4 py-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Quản Lý Chủ Đề</h1>
      <div className="flex justify-end mb-4">
        <Link to="/topicform">
          <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
            Thêm Chủ Đề
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700 border border-gray-300">ID</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700 border border-gray-300">Tên</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700 border border-gray-300">Slug</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700 border border-gray-300">Mô Tả</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700 border border-gray-300">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {topics.length > 0 ? (
              topics.map(topic => (
                <tr key={topic.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-300">{topic.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-300">{topic.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-300">{topic.slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 border border-gray-300">{topic.description || 'Không có mô tả'}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleEdit(topic.id)}
                        className="text-yellow-500 hover:text-yellow-600"
                        aria-label={`Edit ${topic.name}`}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(topic.id)}
                        className="text-red-500 hover:text-red-600"
                        aria-label={`Delete ${topic.name}`}
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Không có chủ đề nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Topic;
