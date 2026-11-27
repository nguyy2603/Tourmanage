    import { useState } from 'react'
    import { FaTimes } from 'react-icons/fa'

    const emptyTour = {
      name: '',
      destination: '',
      duration: '',
      price: '',
      departure: '',
      image: '',
      description: '',
    }

    // Modal dùng chung cho cả chức năng "Thêm tour" và "Sửa tour".
    // Nếu prop "initialData" có giá trị => đang ở chế độ sửa, ngược lại là chế độ thêm mới.
    // Lưu ý: ở nơi sử dụng component này, hãy truyền "key" khác nhau giữa chế độ
    // thêm/sửa (VD: key={editingTour?.id || 'new'}) để form được khởi tạo lại đúng dữ liệu.
    function TourFormModal({onClose,initialData,onSubmit,saving = false}) {
      const [form, setForm] = useState(
        ()=>initialData ? { ...emptyTour, ...initialData } : emptyTour,
      )
      const [imageError, setImageError] = useState('')
    const isChange=(e)=> {
      const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
      if (name === 'image') setImageError('')
    }

    const normalizeImageUrl = (value) => {
      const imageUrl = (value || '').trim()
      if (!imageUrl) return ''

      if (imageUrl.startsWith('gs://')) {
        const gsPath = imageUrl.slice(5)
        const separatorIndex = gsPath.indexOf('/')
        if (separatorIndex > 0) {
          const bucket = gsPath.slice(0, separatorIndex)
          const objectPath = gsPath.slice(separatorIndex + 1)
          if (bucket && objectPath) {
            return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(objectPath)}?alt=media`
          }
        }
        throw new Error('Firebase Storage URL không hợp lệ.')
      }

      try {
        const parsedUrl = new URL(imageUrl)
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
          throw new Error('URL ảnh phải bắt đầu bằng http:// hoặc https://.')
        }
        return parsedUrl.toString()
      } catch (error) {
        if (error.message.startsWith('URL ảnh')) throw error
        throw new Error('URL ảnh không hợp lệ.')
      }
    }
      const handleSubmit = (e) => {
        e.preventDefault()
        try {
          onSubmit({ ...form, image: normalizeImageUrl(form.image) })
        } catch (error) {
          setImageError(error.message)
        }
      }
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                {initialData ? 'Sửa tour' : 'Thêm tour mới'}
              </h2>
              <button type="button" onClick={onClose} disabled={saving} className="text-gray-500 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên tour</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={isChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Đà Nẵng - Bà Nà Hills 3 ngày 2 đêm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đến</label>
                  <input
                    name="destination"
                    value={form.destination}
                    onChange={isChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Đà Nẵng"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Khởi hành từ</label>
                  <input
                    name="departure"
                    onChange={isChange}
                    value={form.departure}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="TP. Hồ Chí Minh"
                  />
                </div>
              </div>
    <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian</label>
                  <input
                    name="duration"
                    onChange={isChange}
                    value={form.duration}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="3 ngày 2 đêm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ)</label>
                  <input
                    type="number"
                    min="0"
                    name="price"
                    onChange={isChange}
                    value={form.price}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2990000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh (URL)</label>
                <input
                  name="image"
                  onChange={isChange}
                  value={form.image}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://... hoặc gs://bucket/thu-muc/anh.jpg"
                />
                {imageError && (
                  <p className="mt-1 text-sm text-red-600">{imageError}</p>
                )}
                {form.image && !imageError && (
                  <p className="mt-2 text-xs text-gray-500">
                    Link phải là đường dẫn trực tiếp đến file ảnh, có thể truy cập công khai.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  name="description"
                  onChange={isChange}
                  value={form.description}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mô tả ngắn về hành trình, điểm tham quan, dịch vụ đi kèm..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={()=>onClose()}
                  type="button"
                  className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? 'Đang lưu...' : (initialData ? 'Lưu thay đổi' : 'Thêm tour')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }

    export default TourFormModal