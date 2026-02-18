# Frontend - Guest Book UI

Next.js frontend for the Guest Book application with a minimalist blue and black design.

## Features

- Server-side rendering with Next.js 14
- Responsive design (mobile-first)
- Real-time comment updates
- Form validation
- Smooth animations and transitions
- Loading states and error handling
- TypeScript for type safety

## Tech Stack

- Next.js 14.1
- React 18.2
- TypeScript 5
- CSS Modules

## Project Structure

```
src/
├── app/                      # Next.js app router
│   ├── page.tsx             # Home page
│   ├── page.module.css      # Home page styles
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── CommentForm/         # New comment form
│   ├── CommentCard/         # Single comment display
│   └── CommentList/         # Comments list
├── services/                # API services
│   └── api.service.ts       # Backend API client
└── types/                   # TypeScript types
    └── comment.ts           # Comment type definitions
```

## Components

### CommentForm
- Input fields for name and message
- Client-side validation
- Submit handler with loading state
- Success/error messages
- Auto-clear on successful submission

### CommentCard
- Displays single comment
- Shows name, message, and timestamp
- Relative time formatting (e.g., "2 hours ago")
- Smooth animations on render

### CommentList
- Displays all comments
- Loading state with spinner
- Error state handling
- Empty state message
- Comments sorted newest first

## Styling

The application uses a **minimalist blue and black theme**:

- **Primary Colors:**
  - Background: `#0a0a0a` to `#1a1a2e` (gradient)
  - Blue accent: `#2563eb`
  - Text: `#ffffff`

- **Components:**
  - Semi-transparent cards with blur effect
  - Blue borders and accents
  - Smooth hover transitions
  - Subtle entrance animations

- **Responsive:**
  - Mobile-first design
  - Breakpoints at 768px
  - Touch-friendly buttons

## Environment Variables

Create a `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For production, change this to your deployed backend URL.

## Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

## API Integration

The frontend communicates with the backend via the `ApiService` class:

```typescript
// Get all comments
const comments = await ApiService.getComments();

// Create a comment
const comment = await ApiService.createComment({
  name: "John",
  message: "Hello!"
});
```

## Development

1. Install dependencies: `npm install`
2. Configure `.env` with backend URL
3. Run dev server: `npm run dev`
4. Open `http://localhost:3000`

## Building for Production

```bash
# Create optimized build
npm run build

# Start production server
npm run start
```

## Customization

### Change Colors

Edit `src/app/globals.css`:

```css
/* Change primary blue */
background: #2563eb; /* Replace with your color */

/* Change background gradient */
background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
```

### Change Validation

Edit `src/components/CommentForm/CommentForm.tsx`:

```typescript
maxLength={100}  // Change character limits
```

### Change Animation Duration

Edit component CSS files:

```css
animation: fadeIn 0.5s ease;  /* Adjust duration */
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Server-side rendering for fast initial load
- Code splitting with Next.js
- Optimized CSS with CSS Modules
- Minimal JavaScript bundle
- Efficient re-renders with React

## Accessibility

- Semantic HTML
- Proper label associations
- High contrast colors
- Keyboard navigation support
- Focus indicators
