import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn()', () => {
  it('returns a single class string unchanged', () => {
    expect(cn('text-red-500')).toBe('text-red-500')
  })

  it('merges multiple class strings', () => {
    expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold')
  })

  it('handles conditional classes (truthy)', () => {
    expect(cn('base', true && 'active')).toBe('base active')
  })

  it('filters out falsy values', () => {
    expect(cn('base', false && 'hidden', null, undefined, '')).toBe('base')
  })

  it('resolves Tailwind conflicts — last padding wins', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('resolves Tailwind conflicts — last text color wins', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles object syntax from clsx', () => {
    expect(cn({ 'font-bold': true, italic: false })).toBe('font-bold')
  })
})
