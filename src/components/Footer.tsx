import React from 'react';
import type {FruitCategory} from '../data/fruits';

interface FooterProps {
  onSelectCategory: (cat: FruitCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({onSelectCategory}) => {
  const jumpToCatalog = (cat: FruitCategory) => {
    onSelectCategory(cat);
    document.getElementById('catalog')?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <footer className="bg-[#FAFAFA] border-t border-[#E4E6E2] py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#E4E6E2]">
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-xl font-semibold text-[#18221B]">Mùa Quả</p>
            <p className="text-sm text-[#5A655E] leading-relaxed max-w-sm">
              Cửa hàng trái cây tuyển chọn trực tiếp từ nhà vườn Việt Nam và các vùng trồng
              xuất khẩu chính ngạch. Bảo quản lạnh chuẩn nhiệt độ, giao tận tay trong ngày.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="font-semibold text-[#18221B]">Danh mục</p>
            <ul className="space-y-2 text-[#5A655E]">
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCatalog('Trái cây Việt')}
                  className="hover:text-[#18221B] transition-colors cursor-pointer"
                >
                  Trái cây đặc sản Việt
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCatalog('Nhập khẩu')}
                  className="hover:text-[#18221B] transition-colors cursor-pointer"
                >
                  Trái cây nhập khẩu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToCatalog('Hộp quà biếu')}
                  className="hover:text-[#18221B] transition-colors cursor-pointer"
                >
                  Hộp quà biếu doanh nghiệp
                </button>
              </li>
              <li>
                <a
                  href="#blog"
                  className="hover:text-[#18221B] transition-colors"
                >
                  Nhật ký chọn quả &amp; Bảo quản
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <p className="font-semibold text-[#18221B]">Kho lạnh & Giao hàng</p>
            <p className="text-[#5A655E]">
              TP.HCM: 42 Xuân Thủy, Thảo Điền, TP. Thủ Đức
            </p>
            <p className="text-[#5A655E]">
              Hà Nội: 18 Nguyễn Chí Thanh, Ba Đình
            </p>
            <p className="text-[#5A655E] font-mono text-xs tabular-nums pt-1">
              Hotline đặt hàng: 1900 6824 (07:30 – 20:30)
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5A655E]">
          <p>© 2026 Mùa Quả. Giao trái cây tươi theo mùa.</p>
          <p>Chính sách đổi trả 100% trong 24 giờ · Thanh toán COD hoặc Chuyển khoản</p>
        </div>
      </div>
    </footer>
  );
};
