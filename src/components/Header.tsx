import React from 'react';
import {ShoppingBag} from 'lucide-react';
import type {FruitCategory} from '../data/fruits';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectNavCategory: (category: FruitCategory) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onSelectNavCategory,
}) => {
  const scrollToSection = (id: string, category?: FruitCategory) => {
    if (category) {
      onSelectNavCategory(category);
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-[#E4E6E2]">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-xl font-semibold tracking-tight text-[#18221B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4D2B]"
        >
          Mùa Quả
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A655E]"
        >
          <button
            type="button"
            onClick={() => scrollToSection('catalog', 'Tất cả')}
            className="hover:text-[#18221B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4D2B]"
          >
            Bộ sưu tập
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('catalog', 'Đang chính vụ')}
            className="hover:text-[#18221B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4D2B]"
          >
            Mùa vụ
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('catalog', 'Hộp quà biếu')}
            className="hover:text-[#18221B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4D2B]"
          >
            Quà biếu
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('orchard-story')}
            className="hover:text-[#18221B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4D2B]"
          >
            Vườn trồng
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('blog')}
            className="hover:text-[#18221B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4D2B]"
          >
            Blog
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Mở giỏ hàng, hiện có ${cartCount} sản phẩm`}
            className="inline-flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-white bg-[#1E4D2B] hover:bg-[#15381F] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4D2B]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Giỏ hàng</span>
            <span className="font-mono text-xs tabular-nums opacity-90">({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
