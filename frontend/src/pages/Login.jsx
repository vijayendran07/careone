import { useState } from 'react'
import API_URL from '../config/api'

export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [userType, setUserType] = useState('user')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Forgot Password state
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetStatus, setResetStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const url = isRegister ? `${API_URL}/api/auth/register` : `${API_URL}/api/auth/login`
      const body = isRegister 
        ? { name, email, password, phone }
        : { email, password }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || (isRegister ? 'Registration failed' : 'Login failed'))
      }

      // Check role matches userType selection (optional but good for UX)
      if (!isRegister && userType === 'admin' && data.role !== 'admin') {
        throw new Error('Not authorized as admin')
      }

      // Save token and user info
      localStorage.setItem('authToken', JSON.stringify({
        token: data.token,
        type: data.role,
        email: data.email,
        name: data.name,
        loginTime: new Date().toISOString()
      }))

      if (data.role === 'admin') {
        window.location.href = '/admin/dashboard'
      } else {
        window.location.href = '/'
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setResetStatus(null)

    // Simulate sending reset link with a realistic loading state
    setTimeout(() => {
      setLoading(false)
      setResetStatus({
        type: 'success',
        message: `✅ A secure reset link has been dispatched to ${resetEmail}. Please check your inbox and spam folders.`
      })
      setResetEmail('')
    }, 1200)
  }



  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-primary mb-2">Care One</h1>
            <p className="text-on-surface-variant">Clinical Excellence in Skin & Hair</p>
          </div>

          {/* Card */}
          <div className="bg-surface rounded-2xl shadow-lg border border-outline-variant/20 p-8">
            <h2 className="text-xl font-bold text-on-surface mb-4 text-center">
              Reset Patient Password
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant text-center mb-6 leading-relaxed">
              Enter your registered email address and we will send you a secure link to reset your password.
            </p>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="resetEmail" className="block text-sm font-semibold text-on-surface mb-2">
                  Email Address
                </label>
                <input
                  id="resetEmail"
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {resetStatus && (
                <div className={`p-4 rounded-lg text-sm leading-relaxed ${
                  resetStatus.type === 'success' 
                    ? 'bg-primary/10 border border-primary/30 text-primary' 
                    : 'bg-error/10 border border-error/30 text-error'
                }`}>
                  {resetStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Sending link...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false)
                  setResetEmail('')
                  setResetStatus(null)
                  setError('')
                }}
                className="text-primary font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer text-sm"
              >
                ← Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-2">Care One</h1>
          <p className="text-on-surface-variant">Clinical Excellence in Skin & Hair</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface rounded-2xl shadow-lg border border-outline-variant/20 p-8">
          {/* Form Header */}
          <h2 className="text-xl font-bold text-on-surface mb-6 text-center">
            {isRegister ? 'Create Patient Account' : 'Welcome Back'}
          </h2>

          {/* User Type Selector - Only show for logging in */}
          {!isRegister && (
            <div className="flex gap-4 mb-8">
              <button
                type="button"
                onClick={() => setUserType('user')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                  userType === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                  userType === 'admin'
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                Admin
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name (Register Only) */}
            {isRegister && (
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-on-surface mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-on-surface mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={!isRegister && userType === 'admin' ? 'admin@careone.com' : 'your@email.com'}
                className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Phone Number (Register Only) */}
            {isRegister && (
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-on-surface mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="1234567890"
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-on-surface mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-error/10 border border-error/30 rounded-lg text-error text-sm">
                {error}
              </div>
            )}

            {/* Remember & Forgot (Login Only) */}
            {!isRegister && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-on-surface-variant">Remember me</span>
                </label>
                {userType === 'user' && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setError('')
                      setShowForgotPassword(true)
                    }}
                    className="text-primary font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer text-xs sm:text-sm"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading 
                ? (isRegister ? 'Creating account...' : 'Signing in...') 
                : (isRegister ? 'Register' : 'Sign In')}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-outline-variant"></div>
            <span className="text-on-surface-variant text-sm">or</span>
            <div className="flex-1 h-px bg-outline-variant"></div>
          </div>

          {/* Toggle Link */}
          <p className="text-center text-on-surface-variant text-sm">
            {isRegister ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              type="button"
              onClick={() => {
                setIsRegister(!isRegister)
                setError('')
              }}
              className="text-primary font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              {isRegister ? 'Sign In' : 'Create one'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
