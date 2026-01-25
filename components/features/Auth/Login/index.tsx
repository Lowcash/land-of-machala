'use client'

import { Brand } from '../Shared/Brand'
import { Layout } from '../Shared/Layout'
import { LoginForm } from './LoginForm'
import { ServerStats } from './ServerStats'

export function Login() {
  return (
    <Layout backgroundImage="/images/login-bg.webp">
      <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
        {/* Left Column: Brand & Login Form */}
        <div className="mx-auto w-full max-w-md">
          <Brand className="mb-8" />
          <LoginForm />
        </div>

        {/* Right Column: Server Stats */}
        <div className="mx-auto hidden w-full max-w-md self-end lg:block">
          <ServerStats />
        </div>
      </div>
    </Layout>
  )
}
