import { renderHook, act } from '@testing-library/react';
import { useSnakeGame, GRID_SIZE } from './useSnakeGame';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('useSnakeGame Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useSnakeGame());

    expect(result.current.snake).toHaveLength(3);
    expect(result.current.direction).toEqual({ x: 0, y: -1 }); // UP
    expect(result.current.gameOver).toBe(false);
    expect(result.current.score).toBe(0);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.food).toHaveProperty('x');
    expect(result.current.food).toHaveProperty('y');
  });

  it('should prevent 180-degree quick turns', () => {
    const { result } = renderHook(() => useSnakeGame());

    act(() => {
      // Trying to go DOWN when moving UP should be blocked
      result.current.changeDirection({ x: 0, y: 1 });
    });
    
    // Direction should still be UP
    expect(result.current.direction).toEqual({ x: 0, y: -1 });

    act(() => {
      // Going LEFT is valid
      result.current.changeDirection({ x: -1, y: 0 });
    });
    
    expect(result.current.direction).toEqual({ x: -1, y: 0 });
  });

  it('should pause and unpause the game', () => {
    const { result } = renderHook(() => useSnakeGame());

    act(() => {
      result.current.setIsPaused(true);
    });

    expect(result.current.isPaused).toBe(true);
    
    act(() => {
      result.current.setIsPaused(false);
    });

    expect(result.current.isPaused).toBe(false);
  });
});
