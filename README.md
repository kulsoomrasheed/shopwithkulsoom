# ShopWithKulsoom

A modern, aesthetic e-commerce React app with product listing, favorites, and beautiful UI using Tailwind CSS.

## Features
- Product listing with search, filter, and sort
- Product detail view
- Add/remove favorites (heart icon)
- Responsive, modern design
- Loading spinner for async actions

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd my-assignment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000).

## Project Structure
```
src/
  components/        # Reusable UI components (ProductCard, Loader, etc.)
  features/          # Redux slices for products, favorites, filters
  pages/             # Main pages (ProductListPage, ProductDetailPage, FavoritesPage)
  store/             # Redux store setup
  index.js           # App entry point
  App.js             # Main app component with navbar and routes
```

## Customization & Notes
- **Styling:** Uses Tailwind CSS for rapid, utility-first styling.
- **API:** Fetches products from [Fake Store API](https://fakestoreapi.com/).
- **Favorites:** Managed in Redux state; persists only for the session.
- **Loader:** Circular progress indicator appears during data loading.
- **Navbar:** Modern, sticky, and responsive with brand name.

## Documentation

### Adding a New Feature
- Create a new component in `src/components/` if it's UI-related.
- Add new Redux logic in `src/features/` if it involves state.
- Add new routes/pages in `src/pages/` and update `App.js`.

### Running Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
```

---

**Author:** Kulsoom

For questions or contributions, open an issue or pull request.
