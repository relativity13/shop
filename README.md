# Prompt for "HIKE CORPORATION" Product Showcase App

## Project Goal

Build a modern, mobile-first Progressive Web App (PWA) for a chemical supply company named **HIKE CORPORATION**. The application should serve as a digital product catalog and order placement tool for their customers. The primary method of finalizing an order is via WhatsApp integration.

## Core Technology Stack

- **Framework**: Next.js with the App Router
- **Language**: TypeScript
- **UI Components**: ShadCN UI
- **Styling**: Tailwind CSS
- **State Management**: React Context API for managing cart, wishlist, and product state.
- **Data Persistence**: User's browser `localStorage` for the wishlist.

## Key Features

### 1. Product Catalog & Discovery
- **Product Listing**: Display a list of all available products on the main screen. Each product card should show its name, description, unit (e.g., 'MT', 'KG'), and factory location.
- **Dynamic Pricing**: Products can have a fixed price per unit or be marked as "Price on request".
  - If a price exists, show the price and provide options to add to cart/wishlist.
  - If no price exists, display a "Price on request" message and provide an "Ask for Quote" button.
- **Search Functionality**: A prominent search bar to filter products by name or description.
- **Category Filtering**: A set of filter buttons to view products by category (e.g., 'Acids', 'Solvents'). The categories should be easily managed from a central data file (`src/lib/data.ts`).

### 2. User Interaction & Ordering
- **Quantity Input**: Users should be able to specify a quantity for each product before adding it to the cart or wishlist.
- **Shopping Cart**:
  - Add products with a specified quantity to the cart.
  - View all items in the cart on a dedicated "Checkout" tab.
  - Update quantities or remove items from the cart.
- **Wishlist / Saved Order**:
  - Add products to a wishlist for future reference or to create a recurring order template.
  - Wishlist data must persist in the user's browser `localStorage`, so it's not lost when the tab is closed.
- **WhatsApp Integration**:
  - **Ask for Quote/Sample**: Buttons on product cards that open WhatsApp with a pre-filled message to the seller asking for a price quote or a sample.
  - **Order Placement**: The final step in the checkout process should not be a payment gateway. Instead, it should summarize the entire order (items, quantities, prices, taxes, shipping) into a formatted message and send it to the seller's WhatsApp number.

### 3. App Structure & UI/UX
- **Tab-Based Navigation**: The primary navigation should be a fixed tab bar at the bottom of the screen, suitable for mobile users. It should include:
  - **Products**: The main product catalog view.
  - **Wishlist**: The user's saved items.
  - **Checkout**: The cart and order summary page.
  - **About Us**: A page with company information and contact details.
- **Checkout Flow**:
  - The checkout tab should clearly display all items in the cart.
  - It must show a detailed bill, including subtotal, taxes (e.g., 18%), and a final total.
  - The bill details section should provide a per-item breakdown, showing the calculation (e.g., `Product Name (2 MT x ₹100)`).
  - The user can select a delivery method ("Deliver" or "I will Pickup").
  - If "Deliver" is chosen, an input for a shipping address should appear.
  - The final action is to confirm the order, which opens WhatsApp.
- **Contact Information**:
  - The homepage header should display the company logo and name.
  - Easy-access buttons to "Send WhatsApp" and "Call us".

### 4. Code & Project Structure
- **Component-Based Architecture**: Break down the UI into reusable React components (e.g., `ProductsTab`, `CheckoutTab`, `WishlistTab`).
- **Centralized State**: Use a global `AppContext` to manage shared state like the cart and wishlist across different components.
- **Service Layer**: Abstract data fetching logic into a `productService` to simulate API calls.
- **Typed Data**: Use TypeScript interfaces (`Product`, `OrderItem`, `WishlistItem`) to ensure data consistency throughout the application.
- **Utility Functions**: Create helper functions for tasks like currency formatting (`formatIndianCurrency`).
