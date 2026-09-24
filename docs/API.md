# LensCare API Documentation

## 1. Orders API

### `POST /api/orders`
Creates a new eyewear order in the system.

**Request Payload:**
```json
{
  "customer": {
    "name": "Tanvir Hasan",
    "phone": "01712345678",
    "email": "tanvir@example.com",
    "division": "Dhaka",
    "district": "Dhaka",
    "address": "House 14, Road 5, Dhanmondi",
    "notes": "Call before delivery"
  },
  "items": [
    {
      "productId": "p1",
      "quantity": 1,
      "unitPrice": 3200,
      "totalPrice": 3200,
      "variantId": "v1",
      "lensConfig": {
        "type": "SINGLE_VISION",
        "material": "THIN",
        "coating": "ANTI_REFLECTION",
        "price": 800
      }
    }
  ],
  "subtotal": 4000,
  "deliveryFee": 60,
  "discount": 400,
  "total": 3660,
  "paymentMethod": "COD",
  "prescriptionNote": "R -2.00, L -1.75, PD 63"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "orderNumber": "LC-2026-89412",
  "order": { ... },
  "message": "Order created successfully"
}
```

---

### `GET /api/orders?orderNumber=LC-2026-89412`
Fetches real-time status and fulfillment milestones for an order.

**Success Response (200):**
```json
{
  "success": true,
  "order": {
    "orderNumber": "LC-2026-89412",
    "customer": { "name": "Tanvir Hasan", "phone": "01712345678" },
    "status": "PROCESSING",
    "total": 3660,
    "trackingEvents": [
      {
        "status": "Order Placed",
        "completed": true
      },
      {
        "status": "Optical Lab Fitting",
        "completed": true
      }
    ]
  }
}
```

---

## 2. Coupons API

### `POST /api/coupons/validate`
Validates coupon codes and returns applied discount in BDT.

**Request Payload:**
```json
{
  "code": "WELCOME10",
  "subtotal": 3500
}
```

**Success Response (200):**
```json
{
  "success": true,
  "code": "WELCOME10",
  "discount": 350,
  "message": "Coupon WELCOME10 applied!"
}
```
Supported coupons:
- `WELCOME10`: 10% off (min ৳1,000)
- `LENSCARE500`: ৳500 flat off (min ৳3,000)
- `FREESHIP`: ৳120 shipping discount (min ৳1,500)
- `EID2026`: 15% off up to ৳1,500 (min ৳2,500)
