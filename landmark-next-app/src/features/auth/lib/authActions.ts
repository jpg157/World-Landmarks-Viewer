'use client'

// auth routes automatically configured by auth0-nextjs middleware

export async function loginWithOidcProvider(returnUrl: string) {
  window.location.href = `/auth/login?returnTo=${returnUrl}`;
}

export async function signupWithOidcProvider(returnUrl: string) {
  window.location.href = `/auth/login?returnTo=${returnUrl}&screen_hint=signup`;
}

export async function logout(returnUrl: string) {
  window.location.href = `/auth/logout?returnTo=${returnUrl}`;
}
