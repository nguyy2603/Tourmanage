import React from 'react'
import { Globe2, HeartHandshake, ShieldCheck, Headphones } from 'lucide-react'

const values = [
  { icon: HeartHandshake, title: 'Tận tâm', text: 'Luôn lắng nghe và đồng hành cùng khách hàng trong từng hành trình.' },
  { icon: ShieldCheck, title: 'Tin cậy', text: 'Thông tin minh bạch, dịch vụ an toàn và cam kết chất lượng rõ ràng.' },
  { icon: Globe2, title: 'Sáng tạo', text: 'Không ngừng cập nhật các lộ trình và trải nghiệm du lịch mới mẻ.' },
]

const stats = [
  ['10+', 'Năm kinh nghiệm'],
  ['50K+', 'Khách hàng'],
  ['200+', 'Điểm đến'],
  ['98%', 'Hài lòng'],
]

export const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1800&q=85"
          alt="Hành trình du lịch"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-900/20" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-400">Về VietTravel</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Kết nối bạn với những hành trình đáng nhớ
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Chúng tôi mang đến những chuyến đi chất lượng, an toàn và giàu cảm xúc tại Việt Nam và khắp thế giới.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Câu chuyện của chúng tôi</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Du lịch trọn vẹn bắt đầu từ sự quan tâm</h2>
            <p className="mt-5 leading-7 text-slate-600">
              VietTravel được thành lập với mong muốn giúp mỗi khách hàng dễ dàng khám phá những vùng đất mới.
              Từ tour trong nước đến hành trình quốc tế, chúng tôi thiết kế mỗi lịch trình với sự chăm chút
              và am hiểu sâu sắc về nhu cầu của du khách.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Đội ngũ tư vấn giàu kinh nghiệm luôn sẵn sàng hỗ trợ từ lúc lên ý tưởng đến khi hoàn tất chuyến đi.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=85"
              alt="Du khách khám phá"
              className="h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map(([number, label]) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold sm:text-4xl">{number}</div>
              <div className="mt-1 text-sm text-blue-100">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Giá trị cốt lõi</span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Cam kết đồng hành trên mọi hành trình</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-slate-100 bg-slate-50 p-7 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl bg-slate-900 p-8 text-white md:grid-cols-[1fr_auto] md:items-center sm:p-10">
          <div>
            <Headphones className="h-8 w-8 text-blue-400" />
            <h2 className="mt-4 text-2xl font-bold">Bạn đang lên kế hoạch cho chuyến đi?</h2>
            <p className="mt-2 text-slate-300">Đội ngũ VietTravel sẵn sàng tư vấn lịch trình phù hợp với bạn.</p>
          </div>
          <a href="tel:+840123456789" className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-bold hover:bg-blue-500">
            Liên hệ tư vấn
          </a>
        </div>
      </section>
    </div>
  )
}
