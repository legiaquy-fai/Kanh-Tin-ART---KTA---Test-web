import React, {useMemo} from 'react';
import {Search, Plus, X} from 'lucide-react';
import {
  CATEGORY_TABS,
  FRUIT_PRODUCTS,
  formatVND,
  type FruitCategory,
  type FruitProduct,
  type FruitVariant,
} from '../data/fruits';
import {FruitArtwork} from './FruitArtwork';

export type SortOption = 'featured' | 'price-asc' | 'price-desc';

interface ProductCatalogProps {
  selectedCategory: FruitCategory;
  onSelectCategory: (cat: FruitCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenProduct: (product: FruitProduct) => void;
  onQuickAdd: (product: FruitProduct, variant: FruitVariant) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onOpenProduct,
  onQuickAdd,
}) => {
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = FRUIT_PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Tất cả'
          ? true
          : selectedCategory === 'Đang chính vụ'
            ? item.isSeasonal
            : item.category === selectedCategory;

      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.origin.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.variants[0].price - b.variants[0].price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.variants[0].price - a.variants[0].price);
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 lg:py-20 bg-[#FAFAFA]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-[#5A655E] mb-2">
              Danh mục trái cây tươi mỗi ngày
            </p>
            <h2
              className="font-display text-3xl lg:text-4xl font-semibold text-[#18221B] tracking-tight"
              style={{textWrap: 'balance'}}
            >
              Tuyển chọn theo mùa
            </h2>
          </div>

          <p className="text-sm text-[#5A655E] tabular-nums">
            Hiển thị {filteredProducts.length} / {FRUIT_PRODUCTS.length} loại quả
          </p>
        </div>

        {/* Filter, Search & Sort Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-10 border-b border-[#E4E6E2]">
          {/* Interactive Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Lọc theo danh mục trái cây"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2F3F0] rounded-lg"
          >
            {CATEGORY_TABS.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => onSelectCategory(category)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4D2B] ${
                    active
                      ? 'bg-white text-[#18221B] shadow-xs'
                      : 'text-[#5A655E] hover:text-[#18221B]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="w-4 h-4 text-[#5A655E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tìm tên quả, vùng trồng..."
                aria-label="Tìm kiếm trái cây"
                className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-[#DCE0DA] rounded-lg text-[#18221B] placeholder:text-[#7A847D] focus:outline-none focus:border-[#1E4D2B] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Xóa từ khóa tìm kiếm"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5A655E] hover:text-[#18221B] cursor-pointer p-0.5"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sắp xếp sản phẩm"
              className="px-3.5 py-2 text-sm bg-white border border-[#DCE0DA] rounded-lg text-[#18221B] focus:outline-none focus:border-[#1E4D2B] cursor-pointer"
            >
              <option value="featured">Sắp xếp: Tuyển chọn</option>
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center border border-[#E4E6E2] rounded-xl bg-white">
            <p className="text-base font-medium text-[#18221B] mb-2">
              Không tìm thấy loại trái cây phù hợp với "{searchQuery}"
            </p>
            <p className="text-sm text-[#5A655E] mb-6">
              Thử từ khóa khác như Xoài, Măng cụt, Nho hoặc quay lại toàn bộ danh mục.
            </p>
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onSelectCategory('Tất cả');
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-[#1E4D2B] hover:bg-[#15381F] rounded-lg transition-colors cursor-pointer"
            >
              Xem tất cả trái cây
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const baseVariant = product.variants[0];
              return (
                <article
                  key={product.id}
                  className="group flex flex-col bg-white border border-[#E4E6E2] rounded-xl overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  {/* 4:3 Media Frame (~68% visual weight) */}
                  <button
                    type="button"
                    onClick={() => onOpenProduct(product)}
                    className="aspect-[4/3] w-full overflow-hidden bg-[#F3F4F1] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1E4D2B]"
                    aria-label={`Xem chi tiết ${product.name}`}
                  >
                    <FruitArtwork
                      variant={product.illustrationKey}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </button>

                  {/* Consistent Card Body Field Order */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Clean unboxed metadata with typographic separators */}
                      <div className="flex items-center gap-2 text-xs text-[#5A655E] mb-1.5">
                        <span className="truncate">{product.origin}</span>
                        <span aria-hidden="true">·</span>
                        <span className="shrink-0 tabular-nums">{product.brixLevel}</span>
                      </div>

                      <h3 className="text-base font-semibold text-[#18221B] leading-snug mb-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenProduct(product)}
                          className="text-left hover:text-[#1E4D2B] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </button>
                      </h3>

                      <p className="text-xs text-[#5A655E] line-clamp-2 leading-relaxed">
                        {product.harvestNote}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#ECEEE9] flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[15px] font-semibold text-[#18221B] tabular-nums">
                          {formatVND(baseVariant.price)}
                        </p>
                        <p className="text-xs text-[#5A655E]">
                          {baseVariant.label}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onQuickAdd(product, baseVariant)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1E4D2B] bg-[#F2F5F2] hover:bg-[#1E4D2B] hover:text-white rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4D2B]"
                      >
                        <Plus className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>Thêm vào giỏ</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
