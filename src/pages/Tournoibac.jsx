import React, { useState } from 'react';
import { TOURS_DATA } from '../data/tourdata';
export const Tournoibac = () => {
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const filteredTours =
        activeCategory === 'Tất cả'
            ? TOURS_DATA
            : TOURS_DATA.filter((tour) => tour.category === activeCategory);

    const CATEGORIES = ['Tất cả', 'Miền Trung', 'Miền Bắc', 'Miền Nam', 'Tour Quốc Tế'];
    return (
        <section className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <span className="block text-[11px] font-bold tracking-wider text-blue-600 uppercase mb-1">
                            GỢI Ý HÔM NAY
                        </span>
                        <h2 className="tieude1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Tour Du Lịch Nổi Bật
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Những hành trình được yêu thích và đánh giá cao nhất mùa này
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center gap-2">
                        {CATEGORIES.map((category) => {
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${isActive
                                            ? 'bg-[#1a56db] text-white shadow-sm'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Cards Grid */}
                {filteredTours.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTours.map((tour) => (
                            <div
                                key={tour.id}
                                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                {/* Image Wrapper */}
                                <div className="relative h-52 w-full overflow-hidden bg-slate-200">
                                    <img
                                        src={tour.image}
                                        alt={tour.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Top Badges */}
                                    <div className="absolute top-3 left-3 flex items-center gap-2">
                                        {tour.discount && (
                                            <span className="bg-[#f97316] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                                                {tour.discount}
                                            </span>
                                        )}
                                        {tour.badge && (
                                            <span
                                                className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${tour.badge.type === 'light'
                                                        ? 'bg-white/95 text-slate-800'
                                                        : 'bg-[#065f46] text-white'
                                                    }`}
                                            >
                                                {tour.badge.text}
                                            </span>
                                        )}
                                    </div>

                                    {/* Bottom Right Duration Badge */}
                                    <div className="absolute bottom-3 right-3 bg-slate-900/75 backdrop-blur-xs text-white text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-slate-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                                            />
                                        </svg>
                                        <span>{tour.duration}</span>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        {/* Location & Rating Row */}
                                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                                            <div className="flex items-center gap-1 truncate pr-2">
                                                <svg
                                                    className="w-3.5 h-3.5 text-slate-400 shrink-0"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                <span className="truncate">{tour.location}</span>
                                            </div>

                                            <div className="flex items-center gap-1 shrink-0">
                                                <svg
                                                    className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="font-bold text-slate-700">{tour.rating}</span>
                                                <span className="text-slate-400">({tour.reviews})</span>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {tour.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
                                            {tour.description}
                                        </p>
                                    </div>

                                    {/* Footer Price & CTA */}
                                    <div className="pt-3.5 border-t border-slate-100 flex items-end justify-between">
                                        <div>
                                            <span className="block text-xs text-slate-400 line-through">
                                                {tour.oldPrice}
                                            </span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-lg sm:text-xl font-extrabold text-[#d9480f]">
                                                    {tour.price}
                                                </span>
                                                <span className="text-xs text-slate-400">/khách</span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="px-4 py-2 rounded-lg bg-[#eff6ff] hover:bg-[#1a56db] text-[#1a56db] hover:text-white text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 text-slate-500 text-sm">
                        Hiện chưa có tour nào thuộc danh mục "{activeCategory}".
                    </div>
                )}
            </div>
        </section>
    )
}
