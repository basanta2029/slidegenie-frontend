# SlideGenie Authentication Implementation

## Overview

The authentication system for SlideGenie has been implemented with academic email validation and OAuth integration. The system includes:

- Login and registration pages with academic email validation (.edu domains)
- OAuth integration (Google and Microsoft)
- JWT-based authentication
- Protected routes with middleware
- Password strength indicator
- Responsive design with split-screen layout

## Key Features

### 1. Academic Email Validation
- Only accepts `.edu` email addresses
- Validates email format and domain
- Custom error messages for non-academic emails

### 2. Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)
- Real-time password strength indicator

### 3. OAuth Integration
- Google OAuth for academic Google Workspace accounts
- Microsoft OAuth for institutional Microsoft accounts
- Seamless integration with existing academic credentials

### 4. User Roles
- Student
- Researcher
- Professor

## File Structure

```
app/
├── (auth)/
│   ├── layout.tsx          # Split-screen auth layout
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── register/
│   │   └── page.tsx        # Registration page
│   └── forgot-password/
│       └── page.tsx        # Password reset page
├── (dashboard)/
│   └── dashboard/
│       └── page.tsx        # Protected dashboard page

components/
├── auth/
│   ├── oauth-button.tsx    # OAuth provider buttons
│   ├── password-strength.tsx # Password strength meter
│   └── form-error.tsx      # Error display component
├── ui/
│   ├── button.tsx          # Button component
│   ├── input.tsx           # Input component
│   ├── label.tsx           # Label component
│   ├── checkbox.tsx        # Checkbox component
│   └── select.tsx          # Select dropdown component

lib/
├── auth/
│   ├── auth-context.tsx    # Auth provider and context
│   ├── api.ts              # Auth API client
│   └── validation.ts       # Form validation schemas
└── utils.ts                # Utility functions

middleware.ts               # Route protection middleware
```

## API Integration

The authentication system expects the following API endpoints:

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/forgot-password` - Send password reset email
- `POST /api/auth/reset-password` - Reset password with token
- `POST /api/auth/verify-email` - Verify email address

### OAuth Endpoints
- `POST /api/auth/google` - Google OAuth callback
- `POST /api/auth/microsoft` - Microsoft OAuth callback

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_MICROSOFT_CLIENT_ID=your_microsoft_client_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Usage

### Login Flow
1. User enters academic email and password
2. Form validates .edu email domain
3. On success, JWT token is stored (localStorage or sessionStorage based on "Remember me")
4. User is redirected to dashboard

### Registration Flow
1. User fills out registration form with:
   - Full name
   - Academic email (.edu required)
   - Institution (dropdown or custom input)
   - Academic role
   - Password (with strength requirements)
   - Terms acceptance
2. Email verification sent
3. User redirected to onboarding flow

### Protected Routes
Routes are protected using Next.js middleware:
- `/dashboard/*` - Requires authentication
- `/slides/*` - Requires authentication
- `/templates/*` - Requires authentication
- `/settings/*` - Requires authentication

### Session Management
- JWT tokens stored in localStorage (remember me) or sessionStorage
- Automatic token refresh on 401 responses
- Session persistence across browser restarts (if remember me checked)

## Styling

The authentication pages use:
- Academic color scheme (navy, gold, slate)
- Split-screen design on desktop
- Responsive mobile layout
- Glass morphism effects
- Smooth animations and transitions

## Security Considerations

1. **Password Security**
   - Passwords should be hashed with bcrypt on the backend
   - Never store plain text passwords
   - Implement rate limiting for login attempts

2. **JWT Security**
   - Use secure, random secrets for JWT signing
   - Implement short token expiration times
   - Use refresh tokens for extended sessions

3. **OAuth Security**
   - Validate OAuth tokens on the backend
   - Verify email domains match academic institutions
   - Implement proper CSRF protection

## Testing

To test the authentication system:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to:
   - Login: http://localhost:3000/login
   - Register: http://localhost:3000/register
   - Forgot Password: http://localhost:3000/forgot-password

3. Test scenarios:
   - Valid .edu email registration
   - Invalid email rejection
   - Password strength validation
   - OAuth login flows
   - Protected route access
   - Session persistence

## Future Enhancements

1. **Multi-factor Authentication (MFA)**
   - SMS or authenticator app support
   - Backup codes

2. **Institution Verification**
   - API integration for institution validation
   - Domain-specific registration rules

3. **Social Features**
   - Team/department invitations
   - Collaborative workspaces

4. **Analytics**
   - Login patterns
   - Security event monitoring
   - Usage statistics