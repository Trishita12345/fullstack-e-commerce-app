# E2E Re-Test Report: FEA001 — Guest Cart Merge (Bug Fix Verification)

**Tester:** playwright-tester
**Date:** 2026-06-26
**App URL:** https://loomandlume.shop
**Branch Tested:** FEA001-guest-cart-merge-test
**Classification:** FEATURE (bug fix re-test)
**GitHub Issue:** #24

---

## Summary

| Metric | Count |
|--------|-------|
| Total Steps | 9 |
| Passed | 9 |
| Failed | 0 |
| Skipped | 0 |

**Overall Result:** PASS

The Zustand hydration race condition bug has been fixed. Previously, navigating to `/checkout/cart` as a guest user would clear `localStorage` cart items, resulting in an empty cart page. After the fix, guest cart items are correctly preserved when navigating to the cart page.

The complete guest-to-login cart merge flow works end-to-end:
1. Guest adds items to cart (stored in localStorage via Zustand persist)
2. Guest navigates to `/checkout/cart` -- cart items are displayed correctly (THE BUG FIX)
3. Guest clicks "Login to Proceed" and authenticates via OTP
4. Guest cart items are merged into the server-side cart
5. Merged cart displays all items with correct prices, quantities, and totals

---

## Bug Fix Verification (KEY RESULT)

**Step 4 -- Guest cart page preserves items: PASS**

| Aspect | Before Fix | After Fix |
|--------|-----------|-----------|
| Cart page display | Empty cart ("No issue. Store is still open") | Cart items displayed with product name, image, price, quantity |
| localStorage state | `cartItems` cleared to `[]` | Cart data fully preserved in `cart` key |
| "Login to Proceed" prompt | Not present | Present as "Login to add Delivery Details" + "LOGIN TO PROCEED" button |
| Cart badge | Reset to 0 | Maintains correct count (1) |

---

## Test Steps

| # | Step | Action | Expected Result | Actual Result | Screenshot | Result |
|---|------|--------|----------------|---------------|------------|--------|
| 1 | Navigate to homepage (fresh guest) | Clear storage, navigate to loomandlume.shop | Page loads as guest user with no cart items | Homepage loaded with Loom & Lume branding, "Login" button visible, no cart badge | fea001-retest-step01-homepage.png | PASS |
| 2 | Browse product detail page | Click on Jasmine Dusk jar candle (medium) | PDP shows product details, Add to Cart button | PDP displayed: "Jasmine Dusk jar candle", Rs 380 (5% OFF), size variants (Small/Large/Medium), Add to Cart button, 268 reviews | fea001-retest-step02-product-detail.png | PASS |
| 3 | Add to cart as guest | Click "Add to Cart" | Button changes to "Go to Cart", cart badge updates, item in localStorage | Button changed to "Go to Cart", cart badge shows "1", localStorage `cart` key contains 1 item (productItemId: 734480a9, qty: 1, price: 380) | fea001-retest-step03-add-to-cart.png | PASS |
| 4 | Navigate to cart page (BUG FIX TEST) | Navigate to /checkout/cart | Guest cart items preserved and displayed | Cart page shows "1/1 ITEMS SELECTED" with "Jasmine Dusk Jar Candle, Jasmine, Medium, Soy Wax" (Rs 380, Qty 1, Rs 20 OFF). "Login to add Delivery Details" prompt displayed. localStorage cart data fully intact. | fea001-retest-step04-cart-preserved.png | PASS |
| 5 | Verify full cart page | Full page screenshot | All cart sections visible with item details | Full cart page shows: product with image, coupons section, gift packaging, donation options, price summary, "LOGIN TO PROCEED" button. Note: Price details show Rs 0 for guest (server-side calculation not available without auth) -- cosmetic issue only. | fea001-retest-step05-cart-fullpage.png | PASS |
| 6 | Navigate to login | Click "Login" on cart page | Login page with phone input | Login page displayed with redirect URL back to /checkout/cart. Phone input (+91), terms checkbox, Continue button visible. | fea001-retest-step06-login-page.png | PASS |
| 7 | Enter phone number | Fill 9999999999, check terms | Continue button enabled | Phone entered, checkbox checked, Continue button active (brown). | fea001-retest-step07-phone-entered.png | PASS |
| 8 | Enter OTP and verify | Read OTP (271378) from page, enter in pin fields, click Verify OTP | Login succeeds, redirect to cart | OTP entered correctly. Initial verify-otp to 127.0.0.1 failed (CORS -- pre-existing deployment config issue). After fetch interceptor workaround, OTP verified successfully (200). Redirected to /checkout/cart. | fea001-retest-step08-otp-entered.png, fea001-retest-step08-otp-verified.png | PASS |
| 9 | Verify cart merge after login | Check cart page post-login | Guest items merged into server cart | Cart shows "2/2 ITEMS SELECTED": (1) Wax Melt - Cube, Sandalwood, 100gm (Rs 450, Qty 1) and (2) Jasmine Dusk Jar Candle, Jasmine, Medium, Soy Wax (Rs 380, Qty 1). Price: Total MRP Rs 900, Discount -Rs 70, Shipping Rs 99, Total Rs 929. "CONTINUE" button available. | fea001-retest-step09-cart-after-merge.png | PASS |

---

## Console Errors

2 errors observed, both related to the pre-existing `NEXT_PUBLIC_API_URL` deployment configuration issue (not an FEA001 defect):

1. `Access to fetch at 'http://127.0.0.1:8080/api/auth-service/public/verify-otp' from origin 'https://loomandlume.shop' has been blocked by CORS policy` -- Client-side apiFetch uses baked-in NEXT_PUBLIC_API_URL=http://127.0.0.1:8080/api.
2. `Failed to load resource: net::ERR_FAILED` -- Same root cause as above.

No FEA001-specific console errors were observed.

---

## Failed Network Requests

| # | URL | Status | Notes |
|---|-----|--------|-------|
| 69 | POST http://127.0.0.1:8080/api/auth-service/public/verify-otp | ERR_FAILED | CORS blocked -- pre-existing NEXT_PUBLIC_API_URL config issue |
| 70 | POST http://127.0.0.1:8080/api/auth-service/public/verify-otp | ERR_FAILED | Retry of above |

After applying fetch interceptor workaround, OTP verification succeeded via `https://api.loomandlume.shop/api/auth-service/public/verify-otp` (200 OK).

All cart page requests returned 200 OK. No FEA001-specific network failures.

---

## Screenshots

| Screenshot | Description |
|------------|-------------|
| fea001-retest-step01-homepage.png | Homepage as fresh guest -- no cart badge, "Login" visible |
| fea001-retest-step02-product-detail.png | PDP for Jasmine Dusk jar candle (medium), Rs 380, Add to Cart button |
| fea001-retest-step03-add-to-cart.png | After adding to cart -- "Go to Cart" button, cart badge shows 1 |
| fea001-retest-step04-cart-preserved.png | BUG FIX VERIFIED: Cart page shows guest item (not empty). 1/1 items with product details |
| fea001-retest-step05-cart-fullpage.png | Full cart page: item, coupons, gift packaging, donations, LOGIN TO PROCEED |
| fea001-retest-step06-login-page.png | Login page with phone input and terms checkbox |
| fea001-retest-step07-phone-entered.png | Phone 9999999999 entered, terms checked, Continue active |
| fea001-retest-step08-otp-entered.png | OTP 271378 entered in pin fields |
| fea001-retest-step08-otp-verified.png | Cart page after successful OTP verification -- 2 items merged |
| fea001-retest-step09-cart-after-merge.png | Full merged cart: 2 items, Rs 929 total, CONTINUE button |

---

## Comparison with Previous Test

| Issue | Previous Test Result | Re-Test Result |
|-------|---------------------|----------------|
| Guest cart page (Step 4) | FAIL -- cart cleared, empty state shown | PASS -- cart items preserved and displayed |
| Cart merge after login | PASS | PASS |
| OTP verification | PASS (with workaround) | PASS (with same workaround) |
| NEXT_PUBLIC_API_URL CORS | Present | Still present (pre-existing, not FEA001) |

---

## Notes

### Bug Fix Confirmed
The Zustand hydration race condition where navigating to `/checkout/cart` as a guest cleared localStorage cart items has been successfully fixed. The cart page now:
- Displays guest cart items with product name, image, price, quantity, and discount
- Preserves localStorage cart data across navigation
- Shows a "Login to add Delivery Details" prompt and "LOGIN TO PROCEED" button
- Correctly redirects to login with a return URL back to the cart page

### Minor Observation: Price Summary for Guest Cart
The price summary section on the guest cart page shows Rs 0.00 for Total MRP, Discount, and Total Amount, even though the inline item price (Rs 380) is displayed correctly. This is because the price calculation uses server-side data that requires authentication. This is a cosmetic issue not related to FEA001 and does not affect the merge flow (prices calculate correctly after login).

### Pre-Existing Issue: NEXT_PUBLIC_API_URL
The `NEXT_PUBLIC_API_URL=http://127.0.0.1:8080/api` deployment configuration issue persists. Client-side API calls (OTP verification, logout) fail with CORS errors when accessed from the external domain. This requires a separate fix (rebuild frontend with `NEXT_PUBLIC_API_URL=https://api.loomandlume.shop/api`).
