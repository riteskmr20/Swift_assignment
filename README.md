# Swift Dashboard Application

A modern, responsive React TypeScript dashboard application built with Vite and Tailwind CSS. This project demonstrates advanced React patterns, state management, and a clean, professional UI design.

## 🚀 Features

- **Modern Dashboard Layout**: Clean, professional interface with a dark header and responsive design
- **User Profile Management**: Complete user profile display with data fetching from external APIs
- **Comment Management System**: Advanced data table with sorting, filtering, and pagination
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **State Persistence**: Local storage integration for table state management
- **Keyboard Shortcuts**: Quick search access with `/` key shortcut
- **Loading States**: Beautiful shimmer loading animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.1.0
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 7.8.0
- **HTTP Client**: Axios 1.11.0
- **Icons**: React Icons 5.5.0
- **Linting**: ESLint 9.32.0

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx           # Main dashboard layout
│   ├── CommentComp.tsx         # Comment management table
│   ├── UserProfileCom.tsx      # User profile component
│   ├── UserProfileShimmer.tsx  # Loading skeleton
│   └── DefaultDashboard.tsx    # Default dashboard view
├── context/            # React context
│   └── UserContext.tsx         # User state management
├── assets/             # Static assets
└── App.tsx             # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd swift_assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎯 Key Features Explained

### Dashboard Layout
- **Sticky Header**: Dark-themed header with Swift branding
- **Navigation**: Clean routing between different sections
- **Responsive Design**: Adapts to different screen sizes

### Comment Management
- **Data Table**: Displays comments with sortable columns
- **Search & Filter**: Real-time search across all fields
- **Pagination**: Configurable items per page
- **State Persistence**: Remembers user preferences in localStorage
- **Keyboard Shortcuts**: Press `/` to focus search input

### User Profile
- **Profile Display**: Shows user information in a clean card layout
- **Data Fetching**: Integrates with JSONPlaceholder API
- **Loading States**: Smooth shimmer loading animations
- **Responsive Layout**: Adapts to different screen sizes

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS 4.1.11 for styling with a custom color scheme and responsive design patterns.

### TypeScript
Full TypeScript support with strict type checking and modern ES6+ features.

### ESLint
Configured with React-specific rules and TypeScript support for code quality.

## 📱 Responsive Design

The application is built with a mobile-first approach:
- Responsive grid layouts
- Adaptive navigation
- Touch-friendly interactions
- Optimized for all device sizes

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional aesthetic
- **Loading States**: Smooth shimmer animations
- **Interactive Elements**: Hover effects and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Color Scheme**: Professional dark/light theme

## 🔌 API Integration

The application integrates with external APIs:
- **JSONPlaceholder**: For user data and comments
- **Error Handling**: Graceful fallbacks for API failures
- **Loading States**: User feedback during data fetching

## 🚀 Performance Features

- **Code Splitting**: Route-based code splitting
- **Memoization**: Optimized re-renders with useMemo
- **Lazy Loading**: Efficient data loading patterns
- **Bundle Optimization**: Vite-based build optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Icons from React Icons
- Data from JSONPlaceholder API

---

**Note**: This is a demonstration project showcasing modern React development practices, TypeScript implementation, and professional UI/UX design patterns.
