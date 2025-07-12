# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (runs on port 3000)
- **Build for production**: `npm run build` (TypeScript compilation + Vite build)
- **Preview production build**: `npm run preview`

## Project Architecture

This is a TypeScript-based 2D game engine built with PixiJS and Vite. The architecture follows an Entity-Component-System (ECS) pattern with a centralized game state and modular systems.

### Core Architecture Components

**Game Loop Structure**:
- Game state is centralized in a single `GameState` object
- Separate update and render loops with frame rate throttling
- Systems process game logic, renderers handle visual output
- Screen transitions managed through state machine

**Key Directories**:
- `src/core/` - Core game engine (Game, Entity, Components, Types)
- `src/systems/` - Systems that update the Game State
- `src/renderers/` - Functions that render stuff on different screens
- `src/systems/core/` - Core systems (game stats, input, window)
- `src/systems/screens/` - Screen-specific systems and transitions

**State Management**:
- All game state lives in the `GameState` interface (src/core/types.ts:52)
- State includes system data, screen management, entities, and game operations
- Immutable updates through system functions

**Screen System**:
- Screen-based game flow: loading → start → game → pause/end
- Transition system with configurable in/out durations
- Each screen has dedicated systems and renderers

**Systems Architecture**:
- All systems implement the `System` interface with an `update` function
- Systems are registered in main.ts and run sequentially each frame
- Core systems: GameStats, BrowserWindow, Input
- Screen systems: ScreenTransition, LoadingScreen, StartScreen, GameScreen

**Rendering Pipeline**:
- PixiJS Application setup in src/renderers/_utils.ts
- Renderers clear and rebuild the stage each frame
- Screen-specific renderers handle visual output

### TypeScript Configuration

- Strict TypeScript with modern ES2022 target
- Bundler module resolution for Vite compatibility
- No emit mode (Vite handles compilation)
- Strict linting rules enabled

### Entity System

The entity system is currently minimal - entities are stored in a map but the Component interface is not fully implemented yet. This appears to be in early development.