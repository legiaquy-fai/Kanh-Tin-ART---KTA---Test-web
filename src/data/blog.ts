import type {IllustrationKey} from './fruits';

export type BlogCategory =
  | 'Tất cả'
  | 'Kinh nghiệm chọn quả'
  | 'Kiến thức nông sản'
  | 'Bảo quản lạnh'
  | 'Văn hóa quà biếu';

export interface BlogArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  category: Exclude<BlogCategory, 'Tất cả'>;
  publishedLabel: string;
  isoDate: string;
  readTime: string;
  authorName: string;
  authorRole: string;
  excerpt: string;
  illustrationKey: IllustrationKey;
  relatedProductId: string;
  sections: BlogArticleSection[];
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Tất cả',
  'Kinh nghiệm chọn quả',
  'Kiến thức nông sản',
  'Bảo quản lạnh',
  'Văn hóa quà biếu',
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'cach-phan-biet-xoai-cat-hoa-loc-chin-cay',
    title: 'Cách phân biệt Xoài Cát Hòa Lộc chín cây tự nhiên và xoài ép chín',
    seoTitle: 'Phân biệt Xoài Cát Hòa Lộc chín cây tự nhiên | Blog Mùa Quả',
    seoDescription:
      'Hướng dẫn nhận biết xoài cát Hòa Lộc chín cây qua lớp phấn vỏ, mùi hương đầu cuống và độ đàn hồi thịt quả từ kinh nghiệm nhà vườn Cái Bè.',
    category: 'Kinh nghiệm chọn quả',
    publishedLabel: '15 Tháng 11, 2026',
    isoDate: '2026-11-15',
    readTime: '5 phút đọc',
    authorName: 'Lê Minh Tuấn',
    authorRole: 'Kỹ sư thu mua vùng Tiền Giang',
    excerpt:
      'Vỏ vàng đều chưa chắc là xoài chín cây. Quan sát lớp phấn mỏng tự nhiên, đốm đen li ti và hương thơm dịu ở phần cuống sẽ giúp bạn chọn đúng lứa quả ngon.',
    illustrationKey: 'mango',
    relatedProductId: 'xoai-cat-hoa-loc',
    sections: [
      {
        heading: '1. Quan sát lớp phấn trắng và độ chuyển màu ở vỏ',
        paragraphs: [
          'Xoài Cát Hòa Lộc chín tự nhiên trên cây hiếm khi vàng rực đồng loạt từ đầu đến đuôi trong một đêm. Phần vai quả gần cuống thường ngả vàng ươm trước, trong khi phần chóp đuôi vẫn giữ sắc xanh vàng dịu và còn vương lớp phấn trắng mịn.',
          'Ngược lại, xoài bị xử lý ép chín bằng hóa chất thường có màu vàng chanh đồng đều bất thường trên toàn bộ vỏ, bề mặt bóng loáng do mất lớp phấn tự nhiên và phần thịt bên trong vẫn còn sượng hoặc nhạt vị.',
        ],
      },
      {
        heading: '2. Kiểm tra đầu cuống và mùi hương tự nhiên',
        paragraphs: [
          'Đưa phần cuống xoài lên gần mũi: xoài chín cây tỏa mùi thơm ngọt dịu, thanh tao đặc trưng của giống cát Hòa Lộc vùng phù sa sông Tiền. Nếu chỉ thấy mùi hăng nhẹ hoặc không có hương thơm dù vỏ đã vàng rực, quả đó thường bị hái non.',
          'Ngoài ra, cuống xoài hái đúng độ già thường hơi lõm xuống nhẹ và chắc thịt xung quanh, không bị teo tóp hay thâm nhũn bất thường.',
        ],
      },
      {
        heading: '3. Độ đàn hồi khi ấn nhẹ bằng đầu ngón tay',
        paragraphs: [
          'Khi cầm quả xoài trong lòng bàn tay, bạn sẽ cảm nhận được độ nặng tay và chắc thịt. Ấn nhẹ phần má xoài thấy có độ đàn hồi êm chứ không cứng đơ như đá hay mềm nhũn tụ nước. Đây là thời điểm quả đạt độ ngọt 18–21° Brix lý tưởng nhất.',
        ],
      },
    ],
  },
  {
    id: 'blog-2',
    slug: 'do-ngot-brix-trong-trai-cay-la-gi',
    title: 'Độ ngọt Brix là gì và vì sao nhà vườn đo Brix trước khi cắt cành?',
    seoTitle: 'Độ ngọt Brix trong trái cây là gì? Chuẩn đo lường tại Mùa Quả',
    seoDescription:
      'Tìm hiểu thang đo độ ngọt Brix từ khúc xạ kế quang học và lý do Mùa Quả kiểm tra chỉ số Brix trước khi xuất kho mỗi buổi sáng.',
    category: 'Kiến thức nông sản',
    publishedLabel: '10 Tháng 11, 2026',
    isoDate: '2026-11-10',
    readTime: '4 phút đọc',
    authorName: 'Phạm Thu Hà',
    authorRole: 'Chuyên gia kiểm soát chất lượng',
    excerpt:
      'Thay vì đánh giá cảm tính bằng mắt thường, chỉ số Brix giúp đo chính xác hàm lượng đường hòa tan trong từng giọt nước ép trái cây trước khi đóng hộp.',
    illustrationKey: 'shinemuscat',
    relatedProductId: 'nho-mau-don-shine-muscat',
    sections: [
      {
        heading: 'Thang đo Brix hoạt động như thế nào?',
        paragraphs: [
          'Một độ Brix (1° Bx) tương đương với 1 gam đường tự nhiên hòa tan trong 100 gam dung dịch nước ép trái cây. Chỉ số này được đo trực tiếp tại vườn hoặc phòng kiểm định bằng khúc xạ kế quang học chỉ với một giọt dịch quả.',
          'Ví dụ, nho mẫu đơn Shine Muscat đạt chuẩn xuất khẩu thường nằm trong khoảng 18–22° Brix, trong khi bưởi da xanh ruột hồng cân bằng vị thanh mát ở mức 11–13° Brix.',
        ],
      },
      {
        heading: 'Vì sao cùng một giống quả nhưng độ Brix lại khác nhau?',
        paragraphs: [
          'Biên độ nhiệt ngày và đêm, lượng mưa trước ngày thu hoạch và tuổi cây đều tác động trực tiếp đến lượng đường tích tụ. Những ngày nắng ấm liên tục giúp lá quang hợp mạnh, chuyển hóa tinh bột thành đường tự nhiên nhanh hơn.',
          'Tại Mùa Quả, mỗi lô thu hoạch buổi sáng đều được lấy mẫu ngẫu nhiên đo Brix. Nếu lô quả chưa đạt ngưỡng ngọt chuẩn của giống, đội ngũ sẽ lùi lịch cắt 2–3 ngày thay vì đưa ra thị trường sớm.',
        ],
      },
    ],
  },
  {
    id: 'blog-3',
    slug: 'bao-quan-dau-tay-va-cherry-giu-cuong-xanh',
    title: 'Mẹo bảo quản dâu tây Đà Lạt và cherry trong tủ lạnh suốt 5 ngày',
    seoTitle: 'Cách bảo quản dâu tây và cherry tươi lâu trong tủ lạnh',
    seoDescription:
      'Nguyên tắc không rửa trước khi cất, lót giấy thấm ẩm và chọn nhiệt độ 2–4°C giúp dâu tây Đà Lạt và cherry giữ nguyên độ giòn suốt nhiều ngày.',
    category: 'Bảo quản lạnh',
    publishedLabel: '04 Tháng 11, 2026',
    isoDate: '2026-11-04',
    readTime: '4 phút đọc',
    authorName: 'Đặng Ngọc Mai',
    authorRole: 'Điều phối kho lạnh bảo quản',
    excerpt:
      'Sai lầm phổ biến nhất khiến dâu tây nhanh mềm úng là rửa sạch toàn bộ hộp ngay khi vừa mua về. Chỉ cần thay đổi 3 thói quen nhỏ để giữ quả giòn mọng.',
    illustrationKey: 'strawberry',
    relatedProductId: 'dau-tay-nhat-da-lat',
    sections: [
      {
        heading: 'Tuyệt đối không rửa trước khi cho vào ngăn mát',
        paragraphs: [
          'Vỏ dâu tây rất mỏng và có cấu trúc xốp giữ nước. Khi rửa toàn bộ rồi mới cất tủ lạnh, độ ẩm đọng quanh đài hoa sẽ tạo điều kiện cho nấm mốc phát triển chỉ sau 24 giờ. Hãy chỉ rửa đúng lượng quả dùng ngay trong mỗi lần ăn.',
        ],
      },
      {
        heading: 'Lót giấy thấm ẩm và giữ hộp thoáng khí ở 2–4°C',
        paragraphs: [
          'Đặt một lớp khăn giấy khô sạch dưới đáy hộp thủy tinh hoặc hộp nhựa có lỗ thoáng khí, xếp dâu thành 1–2 lớp nhẹ để tránh đè nén lên nhau. Ngăn rau quả ở nhiệt độ 2–4°C là môi trường lý tưởng nhất cho cả dâu tây lẫn cherry.',
          'Đối với cherry Washington, nên giữ nguyên phần cuống xanh khi bảo quản vì cuống đóng vai trò khóa ẩm giúp thịt quả không bị nhăn vỏ.',
        ],
      },
    ],
  },
  {
    id: 'blog-4',
    slug: 'nghe-thuat-chon-hop-qua-trai-cay-bieu-doi-tac',
    title: 'Cách chọn hộp quà trái cây biếu đối tác: Cân bằng màu sắc và độ chín',
    seoTitle: 'Cách chọn hộp quà trái cây biếu sang trọng, tinh tế | Mùa Quả',
    seoDescription:
      'Gợi ý phối hợp ngũ quả nội địa và nhập khẩu theo sắc thái trang nhã, đồng bộ độ chín để món quà biếu đối tác và gia đình luôn trọn vẹn.',
    category: 'Văn hóa quà biếu',
    publishedLabel: '28 Tháng 10, 2026',
    isoDate: '2026-10-28',
    readTime: '6 phút đọc',
    authorName: 'Trần Hoàng Nam',
    authorRole: 'Phụ trách thiết kế hộp quà',
    excerpt:
      'Một hộp quà trái cây đẹp không nằm ở số lượng quả chất đầy, mà ở cách phối 3–5 giống quả có độ cứng tương đồng và thời gian sử dụng dài ngày.',
    illustrationKey: 'giftbox',
    relatedProductId: 'hop-qua-ngu-qua-thanh-lich',
    sections: [
      {
        heading: 'Ưu tiên trái cây có vỏ chắc và bảo quản được nhiều ngày',
        paragraphs: [
          'Khi tặng đối tác hoặc người thân ở xa, người nhận có thể chưa thưởng thức ngay trong ngày. Vì vậy, nên chọn các loại quả vỏ chắc như táo Envy, nho Shine Muscat, bưởi da xanh, lê Nam Phi kết hợp cùng một cặp xoài chín tới 85% để dùng dần trong 4–5 ngày.',
        ],
      },
      {
        heading: 'Tiết chế phụ kiện nhựa, tôn vinh chất liệu mộc tự nhiên',
        paragraphs: [
          'Xu hướng quà biếu hiện đại hướng đến sự tinh giản: hộp gỗ thông hoặc hộp giấy mỹ thuật cứng cáp, lót vải linen hoặc giấy rơm tự nhiên thay cho màng bọc nilon và nơ kim tuyến rườm rà. Mỗi quả được bọc lưới xốp trắng riêng biệt giúp chống va đập suốt hành trình giao lạnh.',
        ],
      },
    ],
  },
];
