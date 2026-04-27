import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('validateEnv()', () => {
  let originalWindow: typeof globalThis.window

  beforeEach(() => {
    vi.resetModules()
    originalWindow = globalThis.window
    Object.defineProperty(globalThis, 'window', { value: undefined, configurable: true, writable: true })
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    Object.defineProperty(globalThis, 'window', { value: originalWindow, configurable: true, writable: true })
  })

  it('does not throw when NEXT_PUBLIC_API_URL is a valid URL', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'https://api.example.com')
    const { validateEnv } = await import('./env')
    expect(() => validateEnv()).not.toThrow()
  })

  it('throws when NEXT_PUBLIC_API_URL is missing', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', '')
    const { validateEnv } = await import('./env')
    expect(() => validateEnv()).toThrow(
      'NEXT_PUBLIC_API_URL is missing. Please add it to your environment variables.'
    )
  })

  it('throws when NEXT_PUBLIC_API_URL is not a valid URL', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'not-a-url')
    const { validateEnv } = await import('./env')
    expect(() => validateEnv()).toThrow(
      'NEXT_PUBLIC_API_URL must be a valid URL. Received: not-a-url'
    )
  })

  it('accepts localhost URLs', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_URL', 'http://localhost:3001')
    const { validateEnv } = await import('./env')
    expect(() => validateEnv()).not.toThrow()
  })
})
