import React, {useEffect} from 'react';
import {ArrowRight, X} from 'lucide-react';
import type {BlogPost} from '../data/blog';
import {FRUIT_PRODUCTS, formatVND, type FruitProduct} from '../data/fruits';
import {FruitArtwork} from './FruitArtwork';

interface BlogArticleModalProps {
  article: BlogPost | null;
  onClose: () => void;
  onSelectProduct: (product: FruitProduct) => void;
}

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({
  article,
  onClose,
  onSelectProduct,
}) => {
  useEffect(() => {
    if (!article) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  if (!article) return null;

  const relatedProduct = FRUIT_PRODUCTS.find(
    (p) => p.id === article.relatedProductId,
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#18221B]/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-article-title"
      onClick={onClose}
    >
      <article
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-[#E4E6E2] rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-6 sm:px-8 h-14 border-b border-[#E4E6E2] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#5A655E] truncate">
            <span className="font-medium text-[#1E4D2B]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.isoDate}>{article.publishedLabel}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bài viết"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#5A655E] hover:text-[#18221B] hover:bg-[#F3F4F1] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 sm:px-10 py-8">
          <header className="mb-8">
            <h1
              id="blog-article-title"
              className="font-display text-2xl sm:text-3xl font-semibold text-[#18221B] leading-tight tracking-tight mb-4"
              style={{textWrap: 'balance'}}
            >
              {article.title}
            </h1>

            <p className="text-sm text-[#5A655E]">
              Tác giả: <span className="font-medium text-[#18221B]">{article.authorName}</span> ·{' '}
              {article.authorRole}
            </p>
          </header>

          <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#E4E6E2] bg-[#F3F4F1] mb-8">
            <FruitArtwork variant={article.illustrationKey} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-7 max-w-2xl">
            <p className="text-base leading-relaxed text-[#2C3830] font-medium">
              {article.excerpt}
            </p>

            {article.sections.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-[#18221B]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-[15px] leading-[1.7] text-[#3B463F]">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {/* Related Product Callout */}
          {relatedProduct && (
            <div className="mt-10 pt-8 border-t border-[#E4E6E2]">
              <p className="text-xs font-medium text-[#5A655E] mb-3">
                Sản phẩm được nhắc đến trong bài viết
              </p>
              <div className="p-4 rounded-xl border border-[#E4E6E2] bg-[#F3F4F1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-16 rounded-lg overflow-hidden border border-[#DCE0DA] bg-white shrink-0">
                    <FruitArtwork
                      variant={relatedProduct.illustrationKey}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#18221B]">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-xs text-[#5A655E] mt-0.5">
                      {relatedProduct.origin} ·{' '}
                      <span className="font-mono tabular-nums text-[#18221B]">
                        {formatVND(relatedProduct.variants[0].price)}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectProduct(relatedProduct);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1E4D2B] hover:bg-[#15381F] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Xem & đặt mua</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};
