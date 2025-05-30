# Shop with Kulsoom - Product Dashboard

A modern product dashboard built with React, Redux Toolkit, and Testing Libraries. This application demonstrates best practices in building scalable frontend applications with a focus on state management, testing, and user experience.

## Features

- 🛍️ Product listing with responsive grid layout
- 🔍 Debounced search functionality
- 📑 Category filtering
- 💰 Price sorting (low to high / high to low)
- ❤️ Favorite products management
- 🎯 Clean and intuitive user interface
- ♿ Accessible components
- 📱 Fully responsive design

## Tech Stack

- React 18
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Jest and Testing Library for testing
- Fake Store API for product data

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- npm 6.0 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shopwithkulsoom.git
   cd shopwithkulsoom
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Testing

### Running Tests

Run all tests:
```bash
npm test
```

Run tests with coverage report:
```bash
npm test -- --coverage
```

### Test Coverage

The application includes comprehensive test coverage for:
- Redux slices (actions, reducers, and selectors)
- React components (unit tests)
- Integration tests for key features
- End-to-end testing of user workflows

Current test coverage:
- Test Suites: 6 passed, 6 total
- Tests: 34 passed, 34 total
- Snapshots: 0 total
- Time: 21.36 seconds

#### Overall Coverage (>48%)
- Statements: 84.26%
- Functions: 96.96%
- Lines: 83.72%

#### Coverage by Component (>48%)
- **CategoryFilter.js**: 100% across all metrics
- **SearchBar.js**:
  - Statements: 93.75%
  - Functions: 100%
  - Lines: 93.75%
- **SortByPrice.js**: 100% across all metrics

#### Coverage by Feature (>48%)
- **features/favorites/favoritesSlice.js**: 100% across all metrics
- **features/filters/filtersSlice.js**:
  - Statements: 78.94%
  - Functions: 100%
  - Lines: 78.94%
- **features/products/productsSlice.js**:
  - Statements: 65.38%
  - Functions: 85.71%
  - Lines: 65.38%

## Project Structure

```
src/
├── components/          # Reusable UI components
├── features/           # Feature-specific components and logic
│   ├── products/      # Product-related features
│   ├── filters/       # Search and filtering
│   └── favorites/     # Favorites management
├── store/             # Redux store configuration
├── pages/             # Route-level components
└── tests/             # Test utilities and setup
```

## State Management

The application uses Redux Toolkit for state management with the following slices:
- Products: Manages product data and loading states
- Filters: Handles search, category, and sorting state
- Favorites: Manages user's favorite products

## API Integration

The application integrates with the Fake Store API (https://fakestoreapi.com) for product data. Key endpoints:
- GET /products - Fetch all products
- GET /products/categories - Fetch product categories

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.