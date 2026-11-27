import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { getTours, addTour, updateTour, deleteTour } from '../filebase/tourService';
import TourFormModal from '../components/TourFormModal';

export const TourManagement = () => {
  const [tours, setTours] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  const loadTours = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTours();
      setTours(data);
    } catch (err) {
      console.error(err);
      setError('Không thể tải danh sách tour từ Firestore.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadRegisteredTours = async () => {
      try {
        const data = await getTours();
        if (!cancelled) setTours(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError('Không thể tải danh sách tour từ Firestore.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadRegisteredTours();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpenAdd = () => {
    setEditingTour(null);
    setError('');
    setShowForm(true);
  };

  const handleOpenEdit = (tour) => {
    setEditingTour(tour);
    setError('');
    setShowForm(true);
  };

  const handleCloseModal = () => {
    if (saving) return;
    setShowForm(false);
    setEditingTour(null);
  };

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      setError('');
      const payload = {
        ...formData,
        price: Number(formData.price) || 0,
      };

      if (editingTour) {
        await updateTour(editingTour.id, payload);
        setNotice('Cập nhật tour thành công!');
      } else {
        await addTour(payload);
        setNotice('Đã thêm tour mới lên Firestore!');
      }

      setShowForm(false);
      setEditingTour(null);
      await loadTours();
    } catch (err) {
      console.error(err);
      setError('Có lỗi xảy ra khi lưu tour. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tour này?')) return;
    try {
      setError('');
      await deleteTour(id);
      setNotice('Đã xóa tour.');
      setTours((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      setError('Không thể xóa tour. Vui lòng thử lại.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý tour du lịch</h1>
          <p className="text-gray-600 text-sm mt-1">
            Thêm, sửa, xóa thông tin các tour du lịch (dữ liệu lưu trên Cloud Firestore).
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition cursor-pointer self-start sm:self-auto"
        >
          <FaPlus /> Thêm tour
        </button>
      </div>

      {/* Thông báo trạng thái */}
      {notice && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm flex items-center justify-between">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice('')}
            className="text-emerald-800 font-semibold ml-4 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-sm">
          {error}
        </div>
      )}

      {loading && <p className="text-gray-500 py-8 text-center">Đang tải dữ liệu...</p>}

      {!loading && !error && tours.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center">
          <p className="text-gray-500 mb-4">Chưa có tour nào. Hãy bấm nút để thêm tour mới.</p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 cursor-pointer"
          >
            <FaPlus /> Thêm tour đầu tiên
          </button>
        </div>
      )}

      {/* Danh sách tour */}
      {!loading && tours.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                {(tour.image || tour.name) && (
                  <img
                    src={tour.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
                    alt={tour.name}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-44 object-cover bg-gray-100"
                  />
                )}
                <div className="p-4">
                  <h2 className="font-bold text-gray-800 text-base line-clamp-1">{tour.name}</h2>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-2">
                    {tour.destination && (
                      <span className="inline-flex items-center gap-1">
                        <FaMapMarkerAlt className="text-blue-500" /> {tour.destination}
                      </span>
                    )}
                    {tour.duration && (
                      <span className="inline-flex items-center gap-1">
                        <FaClock className="text-amber-500" /> {tour.duration}
                      </span>
                    )}
                  </div>
                  {tour.description && (
                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">{tour.description}</p>
                  )}
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="font-bold text-blue-600 text-sm">
                  {Number(tour.price || 0).toLocaleString('vi-VN')} đ
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(tour)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg transition cursor-pointer"
                  >
                    <FaEdit /> Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(tour.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition cursor-pointer"
                  >
                    <FaTrash /> Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal thêm / sửa tour */}
      {showForm && (
        <TourFormModal
          key={editingTour?.id || 'new-tour'}
          initialData={editingTour}
          saving={saving}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default TourManagement;