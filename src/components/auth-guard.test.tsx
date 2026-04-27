import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AuthGuard } from './auth-guard'

// Mock next/navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

// Mock @vidwadeseram/auth-ui-shared
const mockUseAuth = vi.fn()
vi.mock('@vidwadeseram/auth-ui-shared', () => ({
  useAuth: () => mockUseAuth(),
}))

describe('AuthGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders children when user is authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'test@example.com' },
      loading: false,
      api: {},
    })

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('shows loading state while auth is loading', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: true,
      api: {},
    })

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('returns null (renders nothing) when unauthenticated and not loading', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      api: {},
    })

    const { container } = render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )

    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('redirects to /login when unauthenticated and online', () => {
    // Ensure navigator.onLine is true
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true })

    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      api: {},
    })

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    )

    expect(mockPush).toHaveBeenCalledWith('/login')
  })
})
