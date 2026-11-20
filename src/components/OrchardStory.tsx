import React from 'react';
import {HARVEST_CALENDAR, TESTIMONIALS} from '../data/fruits';
import {FruitArtwork} from './FruitArtwork';

export const OrchardStory: React.FC = () => {
  return (
    <section
      id="orchard-story"
      className="py-16 lg:py-20 bg-[#F3F4F1] border-t border-[#E4E6E2]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Story & Seasonal Harvest Calendar Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col">
            <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden border border-[#DCE0DA] bg-[#DDE5D8]">
              <FruitArtwork variant="orchard" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-[#5A655E] mb-2">
                Canh tác & Mùa vụ
              </p>
              <h2
                className="font-display text-3xl font-semibold text-[#18221B] tracking-tight mb-4"
                style={{textWrap: 'balance'}}
              >
                Mỗi loại quả chỉ ngon nhất vào đúng tuần lễ chín rộ.
              </h2>
              <p className="text-sm lg:text-base leading-relaxed text-[#46514A] mb-8">
                Thay vì trữ kho lạnh dài ngày, Mùa Quả luân phiên nguồn cung theo biểu đồ
                nông lịch của từng vùng trồng trọng điểm. Khi một giống quả hết chính vụ,
                chúng tôi chủ động tạm ngưng để nhường chỗ cho lứa quả tươi mới khác.
              </p>
            </div>

            {/* Clean Hairline-Separated Harvest Calendar Table */}
            <div className="bg-white border border-[#E4E6E2] rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[#E4E6E2] flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#18221B]">
                  Nông lịch thu hoạch tiêu biểu
                </h3>
                <span className="text-xs text-[#5A655E] tabular-nums">4 mùa / năm</span>
              </div>

              <div className="divide-y divide-[#ECEEE9]">
                {HARVEST_CALENDAR.map((row) => (
                  <div
                    key={row.fruit}
                    className="px-5 py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                  >
                    <div className="sm:col-span-5">
                      <p className="text-sm font-medium text-[#18221B]">{row.fruit}</p>
                      <p className="text-xs text-[#5A655E] mt-0.5">{row.region}</p>
                    </div>
                    <div className="sm:col-span-3">
                      <p className="font-mono text-xs font-medium text-[#1E4D2B] tabular-nums">
                        {row.months}
                      </p>
                    </div>
                    <div className="sm:col-span-4">
                      <p className="text-xs leading-relaxed text-[#5A655E]">{row.peakNote}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Adjacent Customer Reviews (Claim-to-Proof Adjacency) */}
        <div className="mt-14 pt-12 border-t border-[#DCE0DA]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <h3 className="font-display text-2xl font-semibold text-[#18221B]">
              Phản hồi từ khách hàng đặt thường xuyên
            </h3>
            <p className="text-xs text-[#5A655E] tabular-nums">
              Tỷ lệ hài lòng đơn giao lạnh: 98.6% trong 6 tháng qua
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((review) => (
              <blockquote
                key={review.id}
                className="bg-white border border-[#E4E6E2] rounded-xl p-6 flex flex-col justify-between gap-5"
              >
                <p className="text-sm leading-relaxed text-[#2C3830]">
                  “{review.quote}”
                </p>
                <footer className="pt-4 border-t border-[#ECEEE9] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-[#18221B]">{review.name}</p>
                    <p className="text-xs text-[#5A655E]">
                      {review.role} · {review.city}
                    </p>
                  </div>
                  <p className="text-xs text-[#1E4D2B] font-medium">
                    Đã đặt: {review.purchasedItem}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
