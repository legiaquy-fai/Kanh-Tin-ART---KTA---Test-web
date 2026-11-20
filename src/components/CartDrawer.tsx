import React, {useEffect, useState} from 'react';
import {ArrowLeft, CheckCircle2, Minus, Plus, Trash2, X} from 'lucide-react';
import {formatVND, type FruitProduct, type FruitVariant} from '../data/fruits';
import {FruitArtwork} from './FruitArtwork';

export interface CartItem {
  key: string;
  product: FruitProduct;
  variant: FruitVariant;
  quantity: number;
}

interface OrderConfirmation {
  orderCode: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  deliverySlot: string;
  paymentMethod: 'cod' | 'transfer';
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
}

const FREE_SHIP_THRESHOLD = 500000;
const FLAT_SHIPPING_FEE = 30000;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('TP. Hồ Chí Minh');
  const [deliverySlot, setDeliverySlot] = useState('Giao lạnh nhanh trong 2 giờ');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'transfer'>('cod');
  const [note, setNote] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && step === 'confirmed' && items.length > 0) {
      setStep('cart');
    }
  }, [isOpen, step, items.length]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIP_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  const total = subtotal + shippingFee;
  const remainingForFreeShip = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setFormError('Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ giao hàng.');
      return;
    }
    const cleanPhone = phone.replace(/\s+/g, '');
    if (cleanPhone.length < 9) {
      setFormError('Số điện thoại chưa hợp lệ, vui lòng kiểm tra lại.');
      return;
    }

    setFormError('');
    const orderCode = `MQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      orderCode,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city,
      deliverySlot,
      paymentMethod,
      items: [...items],
      subtotal,
      shippingFee,
      total,
    });
    onClearCart();
    setStep('confirmed');
  };

  const handleContinueShopping = () => {
    setStep('cart');
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#18221B]/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Giỏ hàng và thanh toán"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-white border-l border-[#E4E6E2] flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 h-16 border-b border-[#E4E6E2] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => {
                  setFormError('');
                  setStep('cart');
                }}
                aria-label="Quay lại giỏ hàng"
                className="p-1.5 -ml-1.5 rounded-lg text-[#5A655E] hover:text-[#18221B] hover:bg-[#F3F4F1] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
            <h2 className="font-display text-lg font-semibold text-[#18221B]">
              {step === 'cart'
                ? 'Giỏ hàng của bạn'
                : step === 'checkout'
                  ? 'Thông tin giao hàng'
                  : 'Đặt hàng thành công'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng giỏ hàng"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#5A655E] hover:text-[#18221B] hover:bg-[#F3F4F1] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Step 1: Cart Contents */}
        {step === 'cart' && (
          <>
            {items.length > 0 && (
              <div className="px-6 py-3.5 bg-[#F3F4F1] border-b border-[#E4E6E2]">
                <p className="text-xs text-[#18221B] mb-2">
                  {remainingForFreeShip === 0 ? (
                    <span className="font-medium text-[#1E4D2B]">
                      Đơn hàng của bạn được miễn phí giao lạnh 2 giờ.
                    </span>
                  ) : (
                    <>
                      Mua thêm{' '}
                      <span className="font-mono font-semibold tabular-nums">
                        {formatVND(remainingForFreeShip)}
                      </span>{' '}
                      để được miễn phí giao lạnh.
                    </>
                  )}
                </p>
                <div className="w-full h-1.5 bg-[#DCE0DA] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1E4D2B] transition-all duration-200"
                    style={{width: `${progressPercent}%`}}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <p className="text-base font-medium text-[#18221B] mb-2">
                    Giỏ hàng hiện đang trống
                  </p>
                  <p className="text-sm text-[#5A655E] max-w-xs mb-6">
                    Hãy chọn những loại trái cây chín đúng vụ từ danh mục để bắt đầu đơn
                    hàng giao lạnh trong ngày.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-[#1E4D2B] hover:bg-[#15381F] rounded-lg transition-colors cursor-pointer"
                  >
                    Xem trái cây hôm nay
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-[#ECEEE9]">
                  {items.map((item) => (
                    <li key={item.key} className="py-4 flex gap-4">
                      <div className="w-20 h-16 rounded-lg overflow-hidden border border-[#E4E6E2] bg-[#F3F4F1] shrink-0">
                        <FruitArtwork
                          variant={item.product.illustrationKey}
                          className="w-full h-full"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-[#18221B] truncate">
                            {item.product.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.key)}
                            aria-label={`Xóa ${item.product.name}`}
                            className="text-[#7A847D] hover:text-[#B92832] transition-colors p-1 cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <p className="text-xs text-[#5A655E] mt-0.5">
                          {item.variant.label}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#DCE0DA] rounded-md">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.key, -1)}
                              aria-label="Giảm số lượng"
                              className="w-7 h-7 flex items-center justify-center text-[#18221B] hover:bg-[#F3F4F1] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" aria-hidden="true" />
                            </button>
                            <span className="w-8 text-center font-mono text-xs tabular-nums text-[#18221B]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.key, 1)}
                              aria-label="Tăng số lượng"
                              className="w-7 h-7 flex items-center justify-center text-[#18221B] hover:bg-[#F3F4F1] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" aria-hidden="true" />
                            </button>
                          </div>

                          <p className="font-mono text-sm font-semibold text-[#18221B] tabular-nums">
                            {formatVND(item.variant.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[#E4E6E2] bg-[#FAFAFA] space-y-4 shrink-0">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#5A655E]">
                    <span>Tạm tính</span>
                    <span className="font-mono tabular-nums text-[#18221B]">
                      {formatVND(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#5A655E]">
                    <span>Phí giao lạnh</span>
                    <span className="font-mono tabular-nums text-[#18221B]">
                      {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#E4E6E2] flex justify-between text-base font-semibold text-[#18221B]">
                    <span>Tổng thanh toán</span>
                    <span className="font-mono tabular-nums text-[#1E4D2B]">
                      {formatVND(total)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full py-3.5 px-5 text-sm font-semibold text-white bg-[#1E4D2B] hover:bg-[#15381F] rounded-lg transition-colors cursor-pointer"
                >
                  Tiến hành đặt hàng
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Checkout Form */}
        {step === 'checkout' && (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {formError && (
                <div
                  role="alert"
                  className="p-3 rounded-lg border border-[#D98282] bg-[#FDF4F4] text-xs text-[#8C1D1D]"
                >
                  {formError}
                </div>
              )}

              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-medium text-[#18221B] mb-1.5"
                >
                  Họ và tên người nhận
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Lan Anh"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE0DA] rounded-lg text-[#18221B] focus:outline-none focus:border-[#1E4D2B]"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-medium text-[#18221B] mb-1.5"
                >
                  Số điện thoại
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0901 234 567"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE0DA] rounded-lg text-[#18221B] font-mono tabular-nums focus:outline-none focus:border-[#1E4D2B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="checkout-city"
                    className="block text-xs font-medium text-[#18221B] mb-1.5"
                  >
                    Khu vực giao
                  </label>
                  <select
                    id="checkout-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-[#DCE0DA] rounded-lg text-[#18221B] focus:outline-none focus:border-[#1E4D2B]"
                  >
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="checkout-slot"
                    className="block text-xs font-medium text-[#18221B] mb-1.5"
                  >
                    Khung giờ nhận
                  </label>
                  <select
                    id="checkout-slot"
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-[#DCE0DA] rounded-lg text-[#18221B] focus:outline-none focus:border-[#1E4D2B]"
                  >
                    <option value="Giao lạnh nhanh trong 2 giờ">Nhanh trong 2 giờ</option>
                    <option value="Sáng mai (8:00 – 11:00)">Sáng mai (8:00 – 11:00)</option>
                    <option value="Chiều mai (14:00 – 17:00)">Chiều mai (14:00 – 17:00)</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-medium text-[#18221B] mb-1.5"
                >
                  Địa chỉ nhận hàng
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE0DA] rounded-lg text-[#18221B] focus:outline-none focus:border-[#1E4D2B]"
                />
              </div>

              <div>
                <p className="block text-xs font-medium text-[#18221B] mb-2">
                  Phương thức thanh toán
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <label
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#1E4D2B] bg-[#F2F5F2]'
                        : 'border-[#DCE0DA] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#1E4D2B]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#18221B]">
                        Thanh toán khi nhận hàng (COD)
                      </p>
                      <p className="text-xs text-[#5A655E]">
                        Kiểm tra độ tươi trước khi thanh toán cho nhân viên giao lạnh.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === 'transfer'
                        ? 'border-[#1E4D2B] bg-[#F2F5F2]'
                        : 'border-[#DCE0DA] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')}
                      className="accent-[#1E4D2B]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#18221B]">
                        Chuyển khoản ngân hàng (VietQR)
                      </p>
                      <p className="text-xs text-[#5A655E]">
                        Xác nhận tức thì khi đặt quà biếu tặng người thân hoặc đối tác.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="checkout-note"
                  className="block text-xs font-medium text-[#18221B] mb-1.5"
                >
                  Ghi chú đóng gói hoặc thiệp tặng (không bắt buộc)
                </label>
                <textarea
                  id="checkout-note"
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Chọn quả vừa chín tới để dùng sau 2 ngày..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#DCE0DA] rounded-lg text-[#18221B] focus:outline-none focus:border-[#1E4D2B]"
                />
              </div>
            </div>

            <div className="p-6 border-t border-[#E4E6E2] bg-[#FAFAFA] shrink-0 space-y-3">
              <div className="flex justify-between text-sm font-semibold text-[#18221B]">
                <span>Tổng cộng ({items.reduce((s, i) => s + i.quantity, 0)} phần)</span>
                <span className="font-mono tabular-nums text-[#1E4D2B]">
                  {formatVND(total)}
                </span>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 px-5 text-sm font-semibold text-white bg-[#1E4D2B] hover:bg-[#15381F] rounded-lg transition-colors cursor-pointer"
              >
                Xác nhận đặt hàng
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Post-Order Confirmation Receipt */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#1E4D2B] shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-mono text-xs text-[#1E4D2B] font-medium">
                    Đơn hàng #{confirmedOrder.orderCode}
                  </p>
                  <h3 className="text-base font-semibold text-[#18221B]">
                    Đã xác nhận — Đang chuẩn bị đóng gói lạnh
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#46514A] leading-relaxed mb-6">
                Cảm ơn {confirmedOrder.customerName}. Nhân viên kho lạnh tại{' '}
                {confirmedOrder.city} đang tuyển chọn trái cây theo đơn của bạn và sẽ liên
                hệ qua số <span className="font-mono">{confirmedOrder.phone}</span> trước khi
                xuất phát.
              </p>

              <div className="border border-[#E4E6E2] rounded-xl p-4 bg-[#FAFAFA] space-y-3 text-xs mb-6">
                <div className="flex justify-between gap-4">
                  <span className="text-[#5A655E]">Địa chỉ giao</span>
                  <span className="text-[#18221B] font-medium text-right">
                    {confirmedOrder.address}, {confirmedOrder.city}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#5A655E]">Khung giờ</span>
                  <span className="text-[#18221B] font-medium text-right">
                    {confirmedOrder.deliverySlot}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#5A655E]">Thanh toán</span>
                  <span className="text-[#18221B] font-medium text-right">
                    {confirmedOrder.paymentMethod === 'cod'
                      ? 'Thanh toán khi nhận hàng (COD)'
                      : 'Chuyển khoản ngân hàng'}
                  </span>
                </div>
              </div>

              <div className="border border-[#E4E6E2] rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-[#F3F4F1] border-b border-[#E4E6E2] text-xs font-semibold text-[#18221B]">
                  Chi tiết đơn hàng
                </div>
                <ul className="divide-y divide-[#ECEEE9] px-4">
                  {confirmedOrder.items.map((item) => (
                    <li
                      key={item.key}
                      className="py-3 flex justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-medium text-[#18221B]">
                          {item.product.name} × {item.quantity}
                        </p>
                        <p className="text-[#5A655E]">{item.variant.label}</p>
                      </div>
                      <span className="font-mono tabular-nums text-[#18221B]">
                        {formatVND(item.variant.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-3 bg-[#FAFAFA] border-t border-[#E4E6E2] flex justify-between text-sm font-semibold text-[#18221B]">
                  <span>Tổng thanh toán</span>
                  <span className="font-mono tabular-nums text-[#1E4D2B]">
                    {formatVND(confirmedOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleContinueShopping}
              className="mt-6 w-full py-3 px-5 text-sm font-semibold text-white bg-[#1E4D2B] hover:bg-[#15381F] rounded-lg transition-colors cursor-pointer"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
