import React, { useState } from 'react'
import { CalendarDays, Clock3, Search } from 'lucide-react'

const ARTICLES = [
  {
    id: 1,
    category: 'Cẩm nang',
    title: 'Kinh nghiệm khám phá Đà Lạt tự túc dành cho người lần đầu',
    excerpt: 'Thông tin về thời điểm lý tưởng, địa điểm check-in, ẩm thực và cách di chuyển thuận tiện.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=85',
    date: '24/11/2026',
    readTime: '6 phút đọc',
  },
  {
    id: 2,
    category: 'Điểm đến',
    title: 'Vịnh Hạ Long: Hành trình 2 ngày 1 đêm không thể bỏ lỡ',
    excerpt: 'Khám phá hang động, chèo kayak và ngắm hoàng hôn trên một trong những kỳ quan thiên nhiên thế giới.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=85',
    date: '20/11/2026',
    readTime: '5 phút đọc',
  },
  {
    id: 3,
    category: 'Ẩm thực',
    title: 'Top món đặc sản miền Trung nên thử trong chuyến du lịch',
    excerpt: 'Từ mì Quảng, bánh bèo đến hải sản nướng—những hương vị khiến hành trình thêm trọn vẹn.',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1000&q=85',
    date: '17/11/2026',
    readTime: '4 phút đọc',
  },
  {
    id: 4,
    category: 'Khuyến mãi',
    title: 'Ưu đãi đầu mùa: Giảm đến 30% cho tour miền Bắc',
    excerpt: 'Đặt tour từ nay đến hết tháng 12 để nhận nhiều ưu đãi hấp dẫn cho Sapa, Mộc Châu và Hà Giang.',
    image: 'https://images.unsplash.com/photo-1570366583862-f91883984fde?auto=format&fit=crop&w=1000&q=85',
    date: '12/11/2026',
    readTime: '3 phút đọc',
  },
  {
    id: 5,
    category: 'Cẩm nang',
    title: 'Mẹo chuẩn bị hành lý gọn nhẹ cho chuyến đi biển',
    excerpt: 'Danh sách vật dụng thiết yếu giúp chuyến du lịch Phú Quốc hay Nha Trang an toàn và thoải mái.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85',
    date: '08/11/2026',
    readTime: '5 phút đọc',
  },
  {
    id: 6,
    category: 'Điểm đến',
    title: 'Phố cổ Hội An rực rỡ trong sắc vàng của mùa thu',
    excerpt: 'Gợi ý lịch trình tham quan, thưởng thức ẩm thực và trải nghiệm làm đèn lồng truyền thống.',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=85',
    date: '03/11/2026',
    readTime: '7 phút đọc',
  },
]

const CATEGORIES = ['Tất cả', 'Cẩm nang', 'Điểm đến', 'Ẩm thực', 'Khuyến mãi']

export const News = () => {
  const [category, setCategory] = useState('Tất cả')
  const [search, setSearch] = useState('')

  const articles = ARTICLES.filter((article) => {
    const matchCategory = category === 'Tất cả' || article.category === category
    const matchSearch = `${article.title} ${article.excerpt}`.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-blue-400">Bản tin du lịch</p>
          <h1 className="text-3xl font-bold sm:text-5xl">Tin tức &amp; Sự kiện</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Cập nhật cẩm nang, kinh nghiệm và những điểm đến hấp dẫn cho hành trình của bạn.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === item ? 'bg-blue-600 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 md:w-72">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm bài viết..."
              className="h-11 w-full text-sm outline-none"
            />
          </label>
        </div>

        {articles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="h-52 overflow-hidden">
                  <img src={article.image} alt={article.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="p-5">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">{article.category}</span>
                  <h2 className="mt-4 text-lg font-bold leading-snug text-slate-900">{article.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{article.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{article.date}</span>
                    <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-500">
            Không tìm thấy bài viết phù hợp.
          </div>
        )}
      </main>
    </div>
  )
}
