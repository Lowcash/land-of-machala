'use client'

import { Layout } from '../Shared/Layout'
import { LoginForm } from './LoginForm'
import { ServerStats } from './ServerStats'

export function Login() {
  return (
    <Layout backgroundImage="/images/login-bg.webp">
      <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16">
        {/* Left Column */}
        <div className="w-full max-w-md">
          <LoginForm />
        </div>

        {/* Right Column */}
        <div className="w-full max-w-md">
          <ServerStats />
        </div>
      </div>
    </Layout>
  )
}
