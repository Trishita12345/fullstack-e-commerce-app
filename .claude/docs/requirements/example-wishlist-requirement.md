# Feature Requirement: Wishlist

**Author:** product-owner agent
**Date:** 2026-06-18
**Status:** Approved
**Confidence Score:** 94%

---

## Business Context

Customers want to save products they're interested in for later purchase. A wishlist increases engagement, return visits, and conversion by letting users bookmark items without committing to a cart. This is a standard e-commerce feature missing from Loom & Lume.

## Services Affected

| Service | Type of Change | Port |
|---------|---------------|------|
| productService | New API endpoints + DB migration (wishlist lives close to product data) | 8081 |
| Frontend (customer) | New route group `(customer)/wishlist/`, Zustand store, components | 3000 |

## User Stories

### US-1: Add to Wishlist
**As a** logged-in customer
**I want** to add a product item to my wishlist from the PDP or PLP
**So that** I can save it for later without adding to cart

### US-2: View Wishlist
**As a** logged-in customer
**I want** to see all my wishlisted items in one page
**So that** I can review and decide what to purchase

### US-3: Remove from Wishlist
**As a** logged-in customer
**I want** to remove items from my wishlist
**So that** I can keep my list relevant

### US-4: Move to Cart
**As a** logged-in customer
**I want** to move a wishlisted item directly to my cart
**So that** I can purchase it without navigating back to the PDP

### US-5: Wishlist Indicator
**As a** logged-in customer
**I want** to see a heart icon on products already in my wishlist
**So that** I know which items I've already saved

## Acceptance Criteria

### AC-1: Adding to Wishlist
- **Given** I am logged in and viewing a product
- **When** I click the heart/wishlist icon
- **Then** the product item is added to my wishlist, the icon fills to indicate saved state, and a success notification appears

### AC-2: Duplicate Prevention
- **Given** a product item is already in my wishlist
- **When** I click the wishlist icon again
- **Then** the item is removed (toggle behavior), not duplicated

### AC-3: Wishlist Page
- **Given** I have items in my wishlist
- **When** I navigate to /wishlist
- **Then** I see a grid of product cards with image, name, price, and remove/cart actions

### AC-4: Move to Cart
- **Given** I am on the wishlist page
- **When** I click "Move to Cart" on an item
- **Then** the item is added to my cart (via cartStore) and removed from the wishlist

### AC-5: Empty State
- **Given** my wishlist is empty
- **When** I visit /wishlist
- **Then** I see a friendly empty state with a link to browse products

### AC-6: Guest Restriction
- **Given** I am not logged in
- **When** I try to add to wishlist
- **Then** I am redirected to the login page

## API Expectations

### Endpoint 1: POST /wishlist/toggle/{productItemId}
- **Auth:** Authenticated (X-User-Id from gateway)
- **Request Body:** None (product item ID in path)
- **Response (200):**
```json
{
  "added": true,
  "wishlistCount": 5
}
```
- **Error Cases:** 404 (product item not found), 401 (not authenticated)

### Endpoint 2: GET /wishlist
- **Auth:** Authenticated
- **Request Body:** None
- **Response (200):**
```json
{
  "items": [
    {
      "id": "uuid",
      "productItemId": "uuid",
      "productName": "string",
      "productImage": "string",
      "price": 1299.00,
      "originalPrice": 1499.00,
      "inStock": true,
      "addedAt": "2026-06-18T10:00:00"
    }
  ],
  "totalCount": 5
}
```

### Endpoint 3: DELETE /wishlist/{wishlistItemId}
- **Auth:** Authenticated
- **Response (204):** No content

### Endpoint 4: GET /wishlist/check/{productItemId}
- **Auth:** Authenticated
- **Response (200):**
```json
{
  "isWishlisted": true
}
```

## Non-Functional Requirements

- **Performance:** Wishlist check (GET /wishlist/check) must respond < 50ms (called on every PDP/PLP card render)
- **Security:** Users can only access their own wishlist (enforced via X-User-Id)
- **Scalability:** Max 100 items per wishlist (soft limit, return error at 101)
- **Data Retention:** Hard delete on removal (no audit trail needed for wishlist)

## Edge Cases

1. Product item deleted after being wishlisted → show "Product unavailable" in wishlist, allow removal
2. Product goes out of stock → show in wishlist with "Out of Stock" badge, disable "Move to Cart"
3. User adds same item from PDP and PLP simultaneously → toggle endpoint is idempotent
4. Wishlist at max capacity (100 items) → return 409 with message "Wishlist is full"

## Dependencies

- [ ] Requires common module changes? **No** (no new shared events needed for MVP)
- [ ] Requires new Kafka topic? **No** (wishlist is synchronous only for MVP)
- [ ] Requires new Feign client? **No** (wishlist lives in productService alongside product data)
- [ ] Requires new database table? **Yes** — `wishlist_items` table in productService DB
- [ ] Requires frontend route changes? **Yes** — new `(customer)/wishlist/` route

## Open Questions

1. ~~Should guest users have a local wishlist?~~ **Decided: No.** Login required. Simpler MVP.
2. ~~Should wishlist be shareable via URL?~~ **Decided: No.** Future enhancement.

---

## Confidence Scoring Rubric

| Criteria | Weight | Score (0-10) | Weighted |
|----------|--------|-------------|----------|
| User story coverage | 30% | 10 | 3.0 |
| API clarity | 25% | 9 | 2.25 |
| Acceptance criteria specificity | 25% | 9 | 2.25 |
| Edge case handling | 20% | 9 | 1.8 |
| **Total** | **100%** | | **94%** |

> Pipeline gate: PASSED (94% ≥ 90%)
