import React, {useEffect, useState} from 'react';
import {Minus, Plus, X} from 'lucide-react';
import {formatVND, type FruitProduct, type FruitVariant} from '../data/fruits';
import {FruitArtwork} from './FruitArtwork';

interface ProductDetailModalProps {
  product: FruitProduct | null;
  onClose: () => void;
  onAddToCart: (product: FruitProduct, variant: FruitVariant, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product) {
      setSelectedVariantId(product.variants[0].id);
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];
  const lineTotal = selectedVariant.price * quantity;

  const handleSubmit = () => {
    onAddToCart(product, selectedVariant, quantity);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#18221B]/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-[#E4E6E2] rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng chi tiết sản phẩm"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-lg bg-[#F3F4F1] text-[#18221B] hover:bg-[#E4E6E2] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1E4D2B]"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Media & Specs Column */}
          <div className="md:col-span-6 bg-[#F3F4F1] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E4E6E2]">
            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border border-[#E4E6E2] bg-[#F3F4F1]">
              <FruitArtwork variant={product.illustrationKey} className="w-full h-full" />
            </div>

            <dl className="mt-6 space-y-3 text-xs border-t border-[#DCE0DA] pt-5">
              <div className="flex justify-between gap-4">
                <dt className="text-[#5A655E]">Vùng trồng</dt>
                <dd className="font-medium text-[#18221B] text-right">{product.origin}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#5A655E]">Độ ngọt kiểm định</dt>
                <dd className="font-mono font-medium text-[#18221B] tabular-nums text-right">
                  {product.brixLevel}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#5A655E]">Mùa thu hoạch</dt>
                <dd className="font-medium text-[#18221B] text-right">
                  {product.seasonWindow}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#5A655E]">Bảo quản tốt nhất</dt>
                <dd className="font-medium text-[#18221B] text-right max-w-[60%]">
                  {product.storageTip}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#5A655E] mb-2">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.isSeasonal ? 'Đang chính vụ' : 'Có hàng hôm nay'}</span>
              </div>

              <h2
                id="pdp-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-[#18221B] tracking-tight mb-3"
              >
                {product.name}
              </h2>

              <p className="font-mono text-xl font-semibold text-[#1E4D2B] tabular-nums mb-5">
                {formatVND(selectedVariant.price)}
              </p>

              <p className="text-sm leading-relaxed text-[#46514A] mb-6">
                {product.description}
              </p>

              {/* Variant Selector */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-[#18221B] mb-2.5">
                  Chọn quy cách đóng gói
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.variants.map((variant) => {
                    const isSelected = variant.id === selectedVariant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`px-3.5 py-2.5 rounded-lg border text-left transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1E4D2B] ${
                          isSelected
                            ? 'border-[#1E4D2B] bg-[#F2F5F2] text-[#18221B]'
                            : 'border-[#DCE0DA] bg-white text-[#46514A] hover:border-[#9CA69E]'
                        }`}
                      >
                        <p className="text-xs font-semibold text-[#18221B]">
                          {variant.label}
                        </p>
                        <p className="text-xs font-mono text-[#5A655E] tabular-nums mt-0.5">
                          {formatVND(variant.price)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quantity & Primary CTA */}
            <div className="pt-5 border-t border-[#E4E6E2] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#18221B]">Số lượng</span>
                <div className="inline-flex items-center border border-[#DCE0DA] rounded-lg bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Giảm số lượng"
                    className="w-10 h-10 flex items-center justify-center text-[#18221B] hover:bg-[#F3F4F1] rounded-l-lg transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <span className="w-10 text-center font-mono text-sm font-medium text-[#18221B] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Tăng số lượng"
                    className="w-10 h-10 flex items-center justify-center text-[#18221B] hover:bg-[#F3F4F1] rounded-r-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3.5 px-5 text-sm font-semibold text-white bg-[#1E4D2B] hover:bg-[#15381F] rounded-lg transition-colors duration-150 flex items-center justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4D2B]"
              >
                <span>Thêm vào giỏ hàng</span>
                <span className="font-mono tabular-nums">{formatVND(lineTotal)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
