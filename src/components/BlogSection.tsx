import React, {useMemo, useState} from 'react';
import {ArrowRight} from 'lucide-react';
import {BLOG_CATEGORIES, BLOG_POSTS, type BlogCategory, type BlogPost} from '../data/blog';
import {FruitArtwork} from './FruitArtwork';

interface BlogSectionProps {
  onOpenArticle: (article: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({onOpenArticle}) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('Tất cả');

  const visiblePosts = useMemo(() => {
    if (selectedCategory === 'Tất cả') return BLOG_POSTS;
    return BLOG_POSTS.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="py-16 lg:py-20 bg-[#FAFAFA] border-t border-[#E4E6E2]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header & Category Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-10 border-b border-[#E4E6E2]">
          <div>
            <p className="text-xs font-medium text-[#5A655E] mb-2">
              Ghi chép nhà vườn & cẩm nang chọn quả
            </p>
            <h2
              id="blog-heading"
              className="font-display text-3xl lg:text-4xl font-semibold text-[#18221B] tracking-tight"
              style={{textWrap: 'balance'}}
            >
              Nhật ký Mùa Quả
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Lọc bài viết theo chủ đề"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2F3F0] rounded-lg"
          >
            {BLOG_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4D2B] ${
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
        </div>

        {/* Editorial 2-Column Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white border border-[#E4E6E2] rounded-xl overflow-hidden flex flex-col transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <button
                type="button"
                onClick={() => onOpenArticle(post)}
                aria-label={`Đọc bài viết: ${post.title}`}
                className="aspect-[16/9] w-full overflow-hidden bg-[#F3F4F1] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1E4D2B]"
              >
                <FruitArtwork
                  variant={post.illustrationKey}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Zero-pill unboxed metadata line */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A655E] mb-2.5">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.isoDate}>{post.publishedLabel}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[#18221B] leading-snug mb-2.5">
                    <button
                      type="button"
                      onClick={() => onOpenArticle(post)}
                      className="text-left hover:text-[#1E4D2B] transition-colors cursor-pointer"
                    >
                      {post.title}
                    </button>
                  </h3>

                  <p className="text-sm leading-relaxed text-[#46514A] line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#ECEEE9] flex items-center justify-between gap-4">
                  <p className="text-xs text-[#5A655E]">
                    {post.authorName} · {post.authorRole}
                  </p>

                  <button
                    type="button"
                    onClick={() => onOpenArticle(post)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4D2B] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Đọc bài viết</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
