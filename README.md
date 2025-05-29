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

## Testing

### Running Tests
```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --watchAll=false

# Generate coverage report
npm test -- --coverage --watchAll=false
```

### Test Coverage Report

Current test coverage metrics (as of latest run):

| Category | Coverage |
|----------|----------|
| Statements | 52.54% |
| Branches | 45.09% |
| Functions | 67.34% |
| Lines | 54.90% |

#### Coverage by Component
- **App.js**: 100%
- **Redux Features**:
  - Filters: 100%
  - Products: 76.92%
  - Store Configuration: 0%
- **Pages**:
  - ProductListPage: 94.59%

#### Test Suite Summary
- Total Test Suites: 6 passed
- Total Tests: 22 passed
- No failing tests

## Project Structure
```
src/
  components/        # Reusable UI components (ProductCard, Loader, etc.)
  features/         # Redux slices for products, favorites, filters
  pages/           # Main pages (ProductListPage, ProductDetailPage, FavoritesPage)
  store/           # Redux store configuration
  App.js           # Main app component
  index.js         # Entry point
```

## Technologies Used
- React 18
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Testing Library
- Jest