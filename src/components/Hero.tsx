import React from 'react';
import {ArrowRight} from 'lucide-react';
import {FruitArtwork} from './FruitArtwork';

interface HeroProps {
  onExploreCatalog: () => void;
  onJumpToSeason: () => void;
}

const PROVENANCE_PILLARS = [
  {
    title: 'Thu hoạch sáng sớm',
    detail: 'Cắt tại vườn từ 5h sáng, giữ nguyên lớp phấn và cuống xanh.',
  },
  {
    title: 'Giao lạnh trong 2 giờ',
    detail: 'Xe bảo ôn duy trì 4–8°C nội thành TP.HCM và Hà Nội.',
  },
  {
    title: 'Chứng nhận VietGAP',
    detail: 'Minh bạch mã vùng trồng, không chất bảo quản công nghiệp.',
  },
  {
    title: 'Đổi trả tận nơi 100%',
    detail: 'Hoàn tiền hoặc đổi mới ngay nếu quả sượng, dập hoặc kém ngọt.',
  },
];

export const Hero: React.FC<HeroProps> = ({onExploreCatalog, onJumpToSeason}) => {
  return (
    <section id="top" className="border-b border-[#E4E6E2] bg-[#FAFAFA]">
      <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#5A655E] mb-4">
                Tuyển chọn trực tiếp từ Tiền Giang · Lâm Đồng · Gimcheon
              </p>

              <h1
                className="font-display font-semibold text-[#18221B] tracking-tight leading-[1.12] mb-6"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                  textWrap: 'balance',
                }}
              >
                Trái cây chín đúng vụ, giữ trọn hương vị vườn nhà.
              </h1>

              <p className="text-base leading-relaxed text-[#46514A] max-w-xl mb-8">
                Mùa Quả hợp tác trực tiếp với những nhà vườn canh tác bền vững và các nông
                trại xuất khẩu chính ngạch. Mỗi lô quả được đo độ ngọt Brix trước khi đóng
                hộp và giao đến bàn ăn của bạn ngay trong ngày.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onExploreCatalog}
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#1E4D2B] hover:bg-[#15381F] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4D2B]"
                >
                  <span>Khám phá trái cây hôm nay</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onJumpToSeason}
                  className="px-4 py-3 text-sm font-medium text-[#18221B] hover:text-[#1E4D2B] underline underline-offset-4 decoration-[#C8CEC6] hover:decoration-[#1E4D2B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Xem lịch thu hoạch
                </button>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#E4E6E2] grid grid-cols-3 gap-6">
              <div>
                <p className="font-mono text-lg font-medium text-[#18221B] tabular-nums">
                  18–22°
                </p>
                <p className="text-xs text-[#5A655E] mt-0.5">Độ ngọt Brix kiểm định</p>
              </div>
              <div>
                <p className="font-mono text-lg font-medium text-[#18221B] tabular-nums">
                  12 giờ
                </p>
                <p className="text-xs text-[#5A655E] mt-0.5">Từ lúc hái đến tay bạn</p>
              </div>
              <div>
                <p className="font-mono text-lg font-medium text-[#18221B] tabular-nums">
                  0₫
                </p>
                <p className="text-xs text-[#5A655E] mt-0.5">Phí ship đơn từ 500.000₫</p>
              </div>
            </div>
          </div>

          {/* Right Showcase Media Column */}
          <div className="lg:col-span-6">
            <div className="w-full h-full min-h-[320px] lg:min-h-[460px] rounded-xl overflow-hidden border border-[#E4E6E2] bg-[#ECEEE9]">
              <FruitArtwork variant="hero" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Full-width 4-column Provenance Strip below Hero Split */}
        <div className="mt-12 pt-8 border-t border-[#E4E6E2] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PROVENANCE_PILLARS.map((pillar) => (
            <div key={pillar.title} className="space-y-1.5">
              <h2 className="text-sm font-semibold text-[#18221B]">{pillar.title}</h2>
              <p className="text-sm leading-relaxed text-[#5A655E]">{pillar.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
