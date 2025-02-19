import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.https://fshpusfyskhjsurusxrz.supabase.co,
    process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzaHB1c2Z5c2toanN1cnVzeHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NDY1MDgsImV4cCI6MjA1NTUyMjUwOH0.eDhohXKdM7RYEG2Ar9MHz6eqbFRnbpgozUqWjbsT-Js,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        getAll() {
          return request.cookies.getAll().reduce((acc, cookie) => {
            acc[cookie.name] = cookie.value
            return acc
          }, {} as Record<string, string>)
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        setAll(cookies: Record<string, string>) {
          for (const [name, value] of Object.entries(cookies)) {
            response.cookies.set({
              name,
              value,
            })
          }
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getSession()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
