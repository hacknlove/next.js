// @ts-check
import { NextResponse } from 'next/server'

/**
 * @param {import('next/server').NextRequest} request
 * @returns {NextResponse | undefined}
 */
export function middleware(request) {
  if (request.nextUrl.pathname === '/exists-but-not-routed') {
    return NextResponse.rewrite(new URL('/dashboard', request.url))
  }

  if (request.nextUrl.pathname === '/middleware-to-dashboard') {
    return NextResponse.rewrite(new URL('/dashboard', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/internal/test')) {
    const method = request.nextUrl.pathname.endsWith('rewrite')
      ? 'rewrite'
      : 'redirect'

    const internal = ['RSC', 'Next-Router-State-Tree']
    if (internal.some((name) => request.headers.has(name.toLowerCase()))) {
      return NextResponse[method](new URL('/internal/failure', request.url))
    }

    return NextResponse[method](new URL('/internal/success', request.url))
  }

  if (request.nextUrl.pathname === '/search-params-prop-middleware-rewrite') {
    return NextResponse.rewrite(
      new URL(
        '/search-params-prop?first=value&second=other%20value&third',
        request.url
      )
    )
  }

  if (
    request.nextUrl.pathname === '/search-params-prop-server-middleware-rewrite'
  ) {
    return NextResponse.rewrite(
      new URL(
        '/search-params-prop/server?first=value&second=other%20value&third',
        request.url
      )
    )
  }
}
