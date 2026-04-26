# Auth Template — Client Dashboard

User-facing dashboard template with profile management and security settings. Built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.

Works with **all 6 backend auth templates** — Python, Rust, Go × single-tenant and multi-tenant.

## Features

- 📊 **Dashboard** — User overview with account status, email verification, member since
- 👤 **Profile** — View personal information (name, email, role, verification status)
- ⚙️ **Settings** — Update first name, last name
- 🔒 **Security** — Change password with current password verification
- 🔐 **Auth Guard** — Protected routes that redirect unauthenticated users
- 📱 **Responsive Sidebar** — Desktop sidebar + mobile sheet navigation
- 🌗 **Dark Mode** — System/theme toggle

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** + **shadcn/ui**
- **@vidwadeseram/auth-ui-shared** — Shared API client + auth hooks
- **TanStack Query v5** — Server state management
- **Sonner** — Toast notifications
- **next-themes** — Dark mode

## Getting Started

### Prerequisites

- Node.js 22+
- One of the [auth backend templates](https://github.com/vidwadeseram) running

### Installation

```bash
git clone https://github.com/vidwadeseram/auth-template-client.git
cd auth-template-client
npm install --legacy-peer-deps
```

### Configuration

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

### Development

```bash
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── (meta)/
│   │   ├── login/                 # Login
│   │   ├── register/              # Register
│   │   ├── forgot-password/       # Forgot password
│   │   ├── reset-password/        # Reset password
│   │   └── verify-email/          # Verify email
│   ├── (dashboard)/
│   │   ├── dashboard/             # User dashboard
│   │   ├── profile/               # Profile view
│   │   ├── settings/              # Settings edit
│   │   └── security/              # Password change
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Redirect to /dashboard
├── components/
│   ├── auth-guard.tsx             # Route protection
│   ├── sidebar.tsx                # Desktop navigation
│   ├── mobile-nav.tsx             # Mobile navigation
│   ├── providers.tsx              # Auth, Query, Theme providers
│   └── ui/                        # shadcn/ui components
└── lib/
    └── utils.ts
```

## Pages

| Route | Description | Auth Required |
|-------|-------------|:---:|
| `/dashboard` | User dashboard with stats | ✅ |
| `/profile` | View profile information | ✅ |
| `/settings` | Edit name, preferences | ✅ |
| `/security` | Change password | ✅ |
| `/login` | Sign in | ❌ |
| `/register` | Create account | ❌ |
| `/forgot-password` | Request reset link | ❌ |
| `/reset-password` | Set new password | ❌ |
| `/verify-email` | Verify email address | ❌ |

## Related Repositories

### Frontend Templates
- [auth-ui-shared](https://github.com/vidwadeseram/auth-ui-shared) — Shared npm package
- [auth-template-landing](https://github.com/vidwadeseram/auth-template-landing) — Landing page
- [auth-template-admin](https://github.com/vidwadeseram/auth-template-admin) — Admin panel
- [auth-template-superadmin](https://github.com/vidwadeseram/auth-template-superadmin) — Superadmin panel

### Backend Templates
- [python-auth-template](https://github.com/vidwadeseram/python-auth-template)
- [python-multi-tenant-auth-template](https://github.com/vidwadeseram/python-multi-tenant-auth-template)
- [rust-auth-template](https://github.com/vidwadeseram/rust-auth-template)
- [rust-multi-tenant-auth-template](https://github.com/vidwadeseram/rust-multi-tenant-auth-template)
- [go-auth-template](https://github.com/vidwadeseram/go-auth-template)
- [go-multi-tenant-auth-template](https://github.com/vidwadeseram/go-multi-tenant-auth-template)

## License

MIT
