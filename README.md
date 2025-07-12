# 2D Game Engine with AI

A TypeScript-based 2D game engine built with PixiJS and Vite, implementing an Entity-Component-System (ECS) architecture with centralized state management and modular screen transitions.

## Development Commands

- **Start development server**: `npm run dev` (runs on port 3000)
- **Build for production**: `npm run build` (TypeScript compilation + Vite build)
- **Preview production build**: `npm run preview`

## Architecture Overview

This project implements a clean ECS (Entity-Component-System) pattern with the following core principles:

- **Entities**: Pure data containers with unique IDs and component collections
- **Components**: Composable data structures (position, renderable, opacity)
- **Systems**: Logic processors that operate on entities with specific components
- **Centralized State**: All game state managed in a single `GameState` object
- **Screen-based Flow**: Modular screen system with smooth transitions

## Project Structure

```
src/
├── core/                    # Core game engine
│   ├── components/          # Component definitions and factories
│   │   ├── render.ts        # RenderableComponent for graphics
│   │   ├── position.ts      # Positioning components
│   │   └── opacity.ts       # Opacity component for transitions
│   ├── entities/            # Entity management utilities
│   ├── types.ts             # Central type definitions
│   └── index.ts             # Public API exports
├── systems/                 # Game logic systems
│   ├── core/                # Engine-level systems
│   │   ├── game-stats.ts    # FPS, timing, uptime tracking
│   │   ├── browser-window.ts # Window resize handling
│   │   ├── input.ts         # Keyboard input management
│   │   └── screen-transition.ts # Screen state machine
│   └── screens/             # Screen-specific systems
│       ├── loading.ts       # Loading screen logic
│       ├── start.ts         # Start screen interactions
│       └── game.ts          # Main game systems
├── renderers/               # Visual rendering components
│   ├── screens/             # Screen-specific renderers
│   ├── renderables/         # Reusable graphic components
│   └── _utils.ts            # Rendering utilities
└── main.ts                  # Application entry point
```

## Key Features

### Entity-Component System

**Components Available:**
- `RenderableComponent`: Graphics type and visibility control
- `AbsolutePositionComponent`: Fixed x/y coordinates  
- `ResponsivePositionComponent`: Responsive positioning with float alignment
- `OpacityComponent`: Opacity control for transitions and effects

**Entity Management:**
- Auto-incrementing entity IDs
- Type-safe component addition/removal
- Screen-specific entity filtering and cleanup
- Component querying with `getEntitiesWithComponent()`

### Screen Management

**Screen Flow:** loading → start → game → pause/end

**Transition System:**
- Configurable in/out durations per screen
- Smooth opacity animations during transitions
- Automatic entity cleanup on screen exit
- State machine: `none` → `out` → `in` → `none`

### Rendering Pipeline

**PixiJS Integration:**
- High-performance WebGL rendering with fallback
- Anti-aliasing and high-DPI support
- Complete stage clearing and rebuilding each frame
- Modular renderable graphics system

**Rendering Flow:**
1. Screen renderers query entities with `renderable` components
2. Graphics rendered based on component data
3. Responsive positioning calculated from window dimensions
4. Opacity applied from component state

### Systems Architecture

**Core Systems (run every frame):**
- `GameStats`: Performance monitoring and timing
- `BrowserWindow`: Responsive window management
- `Input`: Keyboard state tracking
- `ScreenTransition`: Screen state management

**Screen Systems (screen-specific):**
- `LoadingScreen`: Spinner management and transitions
- `StartScreen`: Menu interactions
- `GameScreen`: Main game logic

## Component Usage Examples

### Creating Entities with Components

```typescript
// Create a spinner entity on loading screen
const entity = createEntity(state, { screen: 'loading' });

// Add responsive positioning
addComponent(state, entity.id, 'responsive-position', 
  createResponsivePositionComponent({
    xFloat: 'right',
    yFloat: 'top', 
    xOffset: -20,
    yOffset: 20
  })
);

// Add renderable graphics
addComponent(state, entity.id, 'renderable',
  createRenderableComponent({ 
    graphics: 'spinner', 
    visible: true 
  })
);

// Add opacity for transitions
addComponent(state, entity.id, 'opacity',
  createOpacityComponent({ opacity: 1 })
);
```

### Querying Entities

```typescript
// Find all renderable entities on current screen
const renderableEntities = getEntitiesWithComponent(state, 'renderable', 'loading');

// Get specific component from entity
const renderable = getComponent<RenderableComponent>(state, entity.id, 'renderable');
```

## TypeScript Configuration

- **Strict TypeScript**: Full type safety with strict mode enabled
- **Modern ES2022**: Latest JavaScript features
- **Bundler Resolution**: Optimized for Vite bundling
- **No Emit Mode**: Vite handles compilation

## Recent Improvements

- **Modular Architecture**: Clear separation between systems and renderers
- **Component-based Entities**: Composable data-driven entity system  
- **Screen Isolation**: Automatic entity management per screen
- **Transition System**: Smooth opacity-based screen transitions
- **Singleton Rendering**: Prevents duplicate entity creation
- **Responsive Positioning**: Flexible layout system