export type FruitCategory =
  | 'Tất cả'
  | 'Trái cây Việt'
  | 'Nhập khẩu'
  | 'Hộp quà biếu'
  | 'Đang chính vụ';

export type IllustrationKey =
  | 'mango'
  | 'mangosteen'
  | 'strawberry'
  | 'shinemuscat'
  | 'pomelo'
  | 'giftbox'
  | 'durian'
  | 'cherry'
  | 'lychee';

export interface FruitVariant {
  id: string;
  label: string;
  weightLabel: string;
  price: number;
}

export interface FruitProduct {
  id: string;
  name: string;
  origin: string;
  category: Exclude<FruitCategory, 'Tất cả' | 'Đang chính vụ'>;
  isSeasonal: boolean;
  seasonWindow: string;
  harvestNote: string;
  brixLevel: string;
  storageTip: string;
  description: string;
  illustrationKey: IllustrationKey;
  variants: FruitVariant[];
}

export interface HarvestScheduleRow {
  fruit: string;
  region: string;
  months: string;
  peakNote: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  city: string;
  quote: string;
  purchasedItem: string;
}

export const CATEGORY_TABS: FruitCategory[] = [
  'Tất cả',
  'Trái cây Việt',
  'Nhập khẩu',
  'Hộp quà biếu',
  'Đang chính vụ',
];

export const FRUIT_PRODUCTS: FruitProduct[] = [
  {
    id: 'xoai-cat-hoa-loc',
    name: 'Xoài Cát Hòa Lộc',
    origin: 'Cái Bè, Tiền Giang',
    category: 'Trái cây Việt',
    isSeasonal: true,
    seasonWindow: 'Tháng 3 – Tháng 6 & Tháng 10 – 12',
    harvestNote: 'Thu hoạch sáng sớm, chín tự nhiên trên cây 85%',
    brixLevel: '18 – 21° Brix',
    storageTip: 'Nhiệt độ phòng 2–3 ngày hoặc ngăn mát 6–8°C',
    description:
      'Quả thuôn dài, vỏ vàng ươm khi chín cùng hương thơm dịu đặc trưng vùng phù sa sông Tiền. Thịt xoài mịn dẻo, ít xơ và vị ngọt thanh đậm hậu.',
    illustrationKey: 'mango',
    variants: [
      {id: '1kg', label: 'Túi 1kg (2–3 quả)', weightLabel: '1kg', price: 115000},
      {id: '2kg', label: 'Túi 2kg (4–6 quả)', weightLabel: '2kg', price: 218000},
      {id: '5kg', label: 'Thùng 5kg nhà vườn', weightLabel: '5kg', price: 520000},
    ],
  },
  {
    id: 'mang-cut-lai-thieu',
    name: 'Măng Cụt Lái Thiêu',
    origin: 'Thuận An, Bình Dương',
    category: 'Trái cây Việt',
    isSeasonal: true,
    seasonWindow: 'Tháng 4 – Tháng 7',
    harvestNote: 'Tuyển chọn quả da tím sẫm, cuống xanh tươi',
    brixLevel: '16 – 19° Brix',
    storageTip: 'Bảo quản ngăn mát 8–10°C dùng ngon nhất trong 5 ngày',
    description:
      'Măng cụt vườn lâu năm Lái Thiêu vỏ mỏng vừa, múi trắng ngần tách hạt dễ dàng. Vị ngọt thanh cân bằng với độ chua nhẹ sảng khoái.',
    illustrationKey: 'mangosteen',
    variants: [
      {id: '1kg', label: 'Túi 1kg (8–10 quả)', weightLabel: '1kg', price: 98000},
      {id: '2kg', label: 'Túi 2kg (16–20 quả)', weightLabel: '2kg', price: 185000},
      {id: '3kg', label: 'Thùng 3kg tuyển chọn', weightLabel: '3kg', price: 270000},
    ],
  },
  {
    id: 'nho-mau-don-shine-muscat',
    name: 'Nho Mẫu Đơn Shine Muscat',
    origin: 'Gimcheon, Hàn Quốc',
    category: 'Nhập khẩu',
    isSeasonal: true,
    seasonWindow: 'Tháng 9 – Tháng 1',
    harvestNote: 'Đi đường hàng không chính ngạch, giữ nguyên lớp phấn',
    brixLevel: '19 – 22° Brix',
    storageTip: 'Giữ lạnh 0–2°C, rửa nhẹ ngay trước khi thưởng thức',
    description:
      'Chùm nho tròn đầy, vỏ xanh ngọc mỏng giòn không hạt, hậu vị thơm thoang thoảng hương xoài và hoa hồng đặc trưng.',
    illustrationKey: 'shinemuscat',
    variants: [
      {id: '700g', label: '1 Chùm (650g–750g)', weightLabel: '700g', price: 365000},
      {id: '1.4kg', label: 'Hộp 2 Chùm (1.4kg)', weightLabel: '1.4kg', price: 690000},
    ],
  },
  {
    id: 'dau-tay-nhat-da-lat',
    name: 'Dâu Tây Giống Nhật Đà Lạt',
    origin: 'Lạc Dương, Lâm Đồng',
    category: 'Trái cây Việt',
    isSeasonal: true,
    seasonWindow: 'Tháng 11 – Tháng 4',
    harvestNote: 'Trồng giá thể cao chuẩn VietGAP, hái lúc 5h sáng',
    brixLevel: '12 – 15° Brix',
    storageTip: 'Không rửa trước khi cất, bảo quản hộp kín ở 2–4°C',
    description:
      'Trái dâu đỏ mọng đồng đều, thịt quả chắc giòn nhưng mọng nước, thơm nồng mùi dâu rừng cao nguyên mà không bị gắt vị chua.',
    illustrationKey: 'strawberry',
    variants: [
      {id: '500g', label: 'Hộp 500g (Size VIP)', weightLabel: '500g', price: 195000},
      {id: '1kg', label: '2 Hộp 500g (1kg)', weightLabel: '1kg', price: 375000},
    ],
  },
  {
    id: 'buoi-da-xanh-ben-tre',
    name: 'Bưởi Da Xanh Ruột Hồng',
    origin: 'Châu Thành, Bến Tre',
    category: 'Trái cây Việt',
    isSeasonal: false,
    seasonWindow: 'Quanh năm',
    harvestNote: 'Quả già cây 8–10 năm tuổi, tỷ lệ tép ráo nước cao',
    brixLevel: '11 – 13° Brix',
    storageTip: 'Nơi khô ráo thoáng mát giữ được 10–14 ngày',
    description:
      'Vỏ xanh mịn, cùi mỏng, tép bưởi màu hồng đào mọng nước nhưng ráo múi, không he đắng và giữ nguyên vị ngọt thanh.',
    illustrationKey: 'pomelo',
    variants: [
      {id: '1.5kg', label: '1 Quả (1.3kg–1.6kg)', weightLabel: '1.5kg', price: 85000},
      {id: '3kg', label: 'Cặp 2 Quả (2.8kg–3.2kg)', weightLabel: '3kg', price: 162000},
      {id: '6kg', label: 'Thùng 4 Quả', weightLabel: '6kg', price: 310000},
    ],
  },
  {
    id: 'hop-qua-ngu-qua-thanh-lich',
    name: 'Hộp Quà Biếu Ngũ Quả Thanh Lịch',
    origin: 'Tuyển chọn nội địa & nhập khẩu',
    category: 'Hộp quà biếu',
    isSeasonal: true,
    seasonWindow: 'Đóng gói theo yêu cầu trong ngày',
    harvestNote: 'Kèm thiệp viết tay và túi vải đay cao cấp',
    brixLevel: 'Độ chín đồng bộ',
    storageTip: 'Giao xe lạnh chuyên dụng, giữ nguyên độ tươi khi trao tặng',
    description:
      'Kết hợp hài hòa giữa Xoài Cát Hòa Lộc, Nho Mẫu Đơn Hàn Quốc, Cherry Đỏ Mỹ, Táo Envy và Lê Nam Phi trong hộp gỗ thông lót vải linen.',
    illustrationKey: 'giftbox',
    variants: [
      {id: 'tieuchuan', label: 'Hộp Tiêu Chuẩn (2.8kg)', weightLabel: '2.8kg', price: 680000},
      {id: 'caocap', label: 'Hộp Thượng Hạng (4.2kg)', weightLabel: '4.2kg', price: 1150000},
    ],
  },
  {
    id: 'sau-rieng-ri6-chin-cay',
    name: 'Sầu Riêng Ri6 Tách Múi',
    origin: 'Long Hồ, Vĩnh Long',
    category: 'Trái cây Việt',
    isSeasonal: false,
    seasonWindow: 'Tháng 4 – Tháng 11',
    harvestNote: 'Cơm vàng hạt lép, không nhúng thuốc ép chín',
    brixLevel: '26 – 29° Brix',
    storageTip: 'Đóng hộp kín hút chân không giữ lạnh 2–4°C trong 3 ngày',
    description:
      'Múi sầu riêng tách sẵn từ quả chín rụng tự nhiên, cơm dày ráo tay, màu vàng nghệ đậm, vị béo ngậy hòa quyện hương thơm nồng nàn.',
    illustrationKey: 'durian',
    variants: [
      {id: '500g', label: 'Khay cơm 500g', weightLabel: '500g', price: 210000},
      {id: '1kg', label: '2 Khay cơm (1kg)', weightLabel: '1kg', price: 405000},
    ],
  },
  {
    id: 'cherry-do-washington',
    name: 'Cherry Đỏ Washington Size 8.5',
    origin: 'Washington, Hoa Kỳ',
    category: 'Nhập khẩu',
    isSeasonal: false,
    seasonWindow: 'Tháng 6 – Tháng 8 & Nhập khẩu Úc/Chile T11–T2',
    harvestNote: 'Cuống xanh cứng cáp, đường kính quả 30–32mm',
    brixLevel: '17 – 20° Brix',
    storageTip: 'Bảo quản 0–2°C trong hộp thoáng khí',
    description:
      'Trái cherry đỏ sẫm căng bóng, thịt quả giòn tan khi cắn, vị ngọt đậm hài hòa và giàu chất chống oxy hóa tự nhiên.',
    illustrationKey: 'cherry',
    variants: [
      {id: '500g', label: 'Hộp 500g', weightLabel: '500g', price: 245000},
      {id: '1kg', label: 'Hộp 1kg', weightLabel: '1kg', price: 470000},
      {id: '2kg', label: 'Hộp quà 2kg', weightLabel: '2kg', price: 910000},
    ],
  },
  {
    id: 'vai-thieu-thanh-ha',
    name: 'Vải Thiều Tổ Thanh Hà',
    origin: 'Thanh Hà, Hải Dương',
    category: 'Trái cây Việt',
    isSeasonal: true,
    seasonWindow: 'Tháng 5 – Tháng 6',
    harvestNote: 'Vận chuyển lạnh đường hàng không trong 12 giờ',
    brixLevel: '18 – 20° Brix',
    storageTip: 'Giữ nguyên chùm bọc giấy ẩm trong ngăn mát 4–6°C',
    description:
      'Chùm vải thiều vỏ đỏ hồng gai nhẵn, hạt nhỏ xíu, cùi dày trắng trong mọng nước với vị ngọt thanh khiết không gắt cổ.',
    illustrationKey: 'lychee',
    variants: [
      {id: '1kg', label: 'Túi 1kg cắt cuống', weightLabel: '1kg', price: 89000},
      {id: '3kg', label: 'Thùng 3kg bảo quản lạnh', weightLabel: '3kg', price: 255000},
    ],
  },
];

export const HARVEST_CALENDAR: HarvestScheduleRow[] = [
  {
    fruit: 'Dâu Tây Đà Lạt & Cherry Chile',
    region: 'Lâm Đồng · Nam Mỹ',
    months: 'Tháng 11 – Tháng 02',
    peakNote: 'Tiết trời lạnh giúp quả đạt độ giòn và hương thơm cao nhất',
  },
  {
    fruit: 'Xoài Cát Hòa Lộc & Vú Sữa Lò Rèn',
    region: 'Tiền Giang · Đồng Tháp',
    months: 'Tháng 03 – Tháng 05',
    peakNote: 'Nắng ấm mùa khô giúp độ đường tự nhiên đạt 19–21° Brix',
  },
  {
    fruit: 'Măng Cụt Lái Thiêu & Vải Thiều',
    region: 'Bình Dương · Hải Dương',
    months: 'Tháng 05 – Tháng 07',
    peakNote: 'Thu hoạch đồng loạt lúc sáng sớm, giao lạnh trong ngày',
  },
  {
    fruit: 'Nho Mẫu Đơn & Táo Nhật Bản',
    region: 'Gimcheon · Aomori',
    months: 'Tháng 09 – Tháng 11',
    peakNote: 'Vụ thu hoạch mùa thu với lớp phấn tự nhiên nguyên vẹn',
  },
];

export const TESTIMONIALS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Nguyễn Minh Hạnh',
    role: 'Trưởng phòng Nhân sự, Công ty Kiến trúc Nam Phương',
    city: 'Quận 3, TP.HCM',
    purchasedItem: '12 Hộp Quà Biếu Ngũ Quả Thanh Lịch',
    quote:
      'Trước đây đặt giỏ trái cây đối tác hay gặp tình trạng quả dập bên dưới hoặc chín không đều. Từ khi chuyển sang Mùa Quả, hộp gỗ giao đến mát lạnh, từng quả được lót lưới riêng và khách hàng phản hồi rất hài lòng.',
  },
  {
    id: 'rev-2',
    name: 'Trần Quốc Bảo',
    role: 'Bếp trưởng, Bếp Gia Đình An Nhiên',
    city: 'Quận Cầu Giấy, Hà Nội',
    purchasedItem: 'Xoài Cát Hòa Lộc & Dâu Tây Đà Lạt',
    quote:
      'Điểm tôi đánh giá cao nhất là độ trung thực về độ chín. Đặt đơn buổi sáng để làm tráng miệng buổi tối, trái cây giao đúng khung 2 tiếng, thơm tự nhiên và không có mùi thuốc bảo quản.',
  },
];

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
}
