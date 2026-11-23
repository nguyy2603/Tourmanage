import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Star, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Search, 
  TrendingUp 
} from 'lucide-react';
import { Tournoibac } from './Tournoibac';

const DESTINATIONS = [
  {
    id: 'ha-long',
    title: 'Vịnh Hạ Long',
    subtitle: 'Kỳ quan thiên nhiên thế giới - Du thuyền 5 sao đẳng cấp',
    badge: '14 Tour đang mở bán',
    badgeStyle: 'bg-amber-500 text-white',
    price: '1.850.000đ',
    hasPricePrefix: true,
    gridClass: 'lg:col-span-7',
    heightClass: 'h-[320px] md:h-[360px]',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=85',
    duration: '2 Ngày 1 Đêm',
    rating: '4.9 (420 đánh giá)',
    highlights: [
      'Nghỉ dưỡng trên du thuyền 5 sao chuẩn quốc tế',
      'Chèo thuyền Kayak khám phá Hang Luồn & Đảo Titop',
      'Thưởng thức tiệc hải sản Hạ Long trên boong tàu'
    ]
  },
  {
    id: 'da-nang-hoi-an',
    title: 'Đà Nẵng – Hội An',
    subtitle: 'Phố cổ đèn lồng & Cầu Vàng Bà Nà',
    badge: '22 Tour đang mở bán',
    badgeStyle: 'bg-emerald-500 text-white',
    price: '3.490.000đ',
    hasPricePrefix: true,
    gridClass: 'lg:col-span-5',
    heightClass: 'h-[320px] md:h-[360px]',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85',
    duration: '3 Ngày 2 Đêm',
    rating: '4.9 (615 đánh giá)',
    highlights: [
      'Check-in Cầu Vàng & Khu du lịch Bà Nà Hills',
      'Thả đèn hoa đăng trên sông Hoài phố cổ Hội An',
      'Tắm biển Mỹ Khê và thưởng thức đặc sản miền Trung'
    ]
  },
  {
    id: 'phu-quoc',
    title: 'Phú Quốc',
    subtitle: 'Thiên đường biển đảo ngọc',
    badge: '18 Tour',
    badgeStyle: 'bg-white/95 text-slate-800 backdrop-blur-sm shadow-sm',
    price: '4.290.000đ',
    hasPricePrefix: false,
    gridClass: 'lg:col-span-4',
    heightClass: 'h-[260px] md:h-[280px]',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1000&q=85',
    duration: '3 Ngày 2 Đêm',
    rating: '4.8 (530 đánh giá)',
    highlights: [
      'Cáp treo Hòn Thơm vượt biển dài nhất thế giới',
      'Lặn ngắm san hô tại quần đảo An Thới',
      'Ngắm hoàng hôn tại Sunset Sanato & Chợ đêm Dương Đông'
    ]
  },
  {
    id: 'sapa-fansipan',
    title: 'Sapa – Fansipan',
    subtitle: 'Chinh phục nóc nhà Đông Dương',
    badge: '12 Tour',
    badgeStyle: 'bg-white/95 text-slate-800 backdrop-blur-sm shadow-sm',
    price: '2.190.000đ',
    hasPricePrefix: false,
    gridClass: 'lg:col-span-4',
    heightClass: 'h-[260px] md:h-[280px]',
    image: 'https://images.unsplash.com/photo-1570366583862-f91883984fde?auto=format&fit=crop&w=1000&q=85',
    duration: '2 Ngày 1 Đêm',
    rating: '4.9 (380 đánh giá)',
    highlights: [
      'Trải nghiệm tàu hỏa leo núi Mường Hoa & Cáp treo Fansipan',
      'Khám phá bản Cát Cát và ruộng bậc thang Tả Van',
      'Thưởng thức lẩu cá hồi, thắng cố giữa tiết trời se lạnh'
    ]
  },
  {
    id: 'quy-nhon-phu-yen',
    title: 'Quy Nhơn – Phú Yên',
    subtitle: 'Xứ Nẫu yên bình, kỳ co Eo Gió',
    badge: '9 Tour',
    badgeStyle: 'bg-white/95 text-slate-800 backdrop-blur-sm shadow-sm',
    price: '3.890.000đ',
    hasPricePrefix: false,
    gridClass: 'lg:col-span-4',
    heightClass: 'h-[260px] md:h-[280px]',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85',
    duration: '3 Ngày 2 Đêm',
    rating: '4.8 (290 đánh giá)',
    highlights: [
      'Khám phá Eo Gió & bãi biển Kỳ Co nước trong vắt',
      'Check-in Gành Đá Đĩa & Bãi Xép hoa vàng cỏ xanh',
      'Thưởng thức hải sản đầm Ô Loan tươi ngon'
    ]
  }
];

export default function Home() {
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [guests, setGuests] = useState('2 người lớn, 1 trẻ em');

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const trendingTags = ['Bà Nà Hills', 'Vịnh Hạ Long', 'Phú Quốc 4N3Đ', 'Mù Pi Lèng'];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ destination, departureDate, guests });
  };

  const handleOpenDetail = (dest) => {
    setBookingSuccess(false);
    setSelectedDestination(dest);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* Hero & Search Section */}
      <section className="relative w-full pb-16">
        <div className="relative h-[540px] md:h-[600px] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=2070&auto=format&fit=crop"
            alt="Cầu Vàng Đà Nẵng"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/65 via-slate-900/50 to-slate-900/75" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center pb-16">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs md:text-sm font-medium text-white backdrop-blur-md border border-white/20">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>4.9/5 Đánh giá tin cậy</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs md:text-sm font-medium text-white backdrop-blur-md border border-white/20">
                <Users className="h-4 w-4 text-sky-400" />
                <span>50.000+ Khách hàng hài lòng</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs md:text-sm font-medium text-white backdrop-blur-md border border-white/20">
                <ShieldCheck className="h-4 w-4 text-rose-400" />
                <span>Bảo hiểm du lịch trọn gói</span>
              </div>
            </div>

            <h1 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.2]">
              Khám Phá Việt Nam & <br className="hidden sm:block" />
              Thế Giới Cùng VietTravel
            </h1>

            <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-slate-200 font-normal leading-relaxed">
              Trải nghiệm hành trình trọn vẹn với hàng trăm tour du lịch chất lượng cao, lịch trình linh hoạt và ưu đãi hấp dẫn được cập nhật mỗi ngày.
            </p>
          </div>
        </div>

        {/* Floating Search Card */}
        <div className="relative z-10 mx-auto -mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-[0_20px_50px_rgba(8,_112,_184,_0.08)] border border-slate-100">
            <form onSubmit={handleSearch} className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
              <div className="md:col-span-4 flex items-center gap-3 rounded-xl bg-slate-50/80 px-4 py-3 border border-slate-100 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="w-full">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">ĐIỂM ĐẾN</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Bạn muốn đi đâu? Đà Nẵng, Sa Pa..."
                    className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none mt-0.5"
                  />
                </div>
              </div>

              <div className="md:col-span-3 flex items-center gap-3 rounded-xl bg-slate-50/80 px-4 py-3 border border-slate-100 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="w-full">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">NGÀY KHỞI HÀNH</label>
                  <input
                    type="text"
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text';
                    }}
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    placeholder="Chọn ngày đi gần nhất"
                    className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none mt-0.5"
                  />
                </div>
              </div>

              <div className="md:col-span-3 flex items-center gap-3 rounded-xl bg-slate-50/80 px-4 py-3 border border-slate-100 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Users className="h-5 w-5" />
                </div>
                <div className="w-full">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">SỐ KHÁCH / NGÂN SÁCH</label>
                  <input
                    type="text"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none mt-0.5"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="flex h-full min-h-[62px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/25 hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Search className="h-4 w-4 stroke-[2.5]" />
                  <span>Tìm kiếm Tour</span>
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-500 mr-1">
                <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
                Xu hướng:
              </span>
              {trendingTags.map((tag, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setDestination(tag)}
                  className="rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

    <Tournoibac/>
    </div>
  );
}
export { Home };