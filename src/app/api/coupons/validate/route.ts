import { NextResponse } from 'next/server';

interface CouponRule {
  discountType: 'PERCENT' | 'FIXED';
  discountValue: number;
  minSubtotal?: number;
  maxDiscount?: number;
}

const COUPONS: Record<string, CouponRule> = {
  WELCOME10: {
    discountType: 'PERCENT',
    discountValue: 10,
    minSubtotal: 1000,
  },
  LENSCARE500: {
    discountType: 'FIXED',
    discountValue: 500,
    minSubtotal: 3000,
  },
  FREESHIP: {
    discountType: 'FIXED',
    discountValue: 120,
    minSubtotal: 1500,
  },
  EID2026: {
    discountType: 'PERCENT',
    discountValue: 15,
    minSubtotal: 2500,
    maxDiscount: 1500,
  },
};

export async function POST(req: Request) {
  try {
    const { code, subtotal } = await req.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Please enter a coupon code' },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = COUPONS[cleanCode];

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Invalid coupon code. Try WELCOME10 or LENSCARE500' },
        { status: 404 }
      );
    }

    if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum order amount for this coupon is ৳${coupon.minSubtotal.toLocaleString()}`,
        },
        { status: 400 }
      );
    }

    let discount = 0;
    if (coupon.discountType === 'PERCENT') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = Math.min(coupon.discountValue, subtotal);
    }

    return NextResponse.json({
      success: true,
      code: cleanCode,
      discount,
      message: `Coupon ${cleanCode} applied!`,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Error processing coupon' },
      { status: 500 }
    );
  }
}
