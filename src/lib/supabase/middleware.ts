import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// ============================================================
// Supabase middleware — refreshes Auth session on every request
// ============================================================
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Supabase credentials not yet configured — proceed without blocking
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session — IMPORTANT: do not add code between this and the return
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect /admin routes
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (!user) {
    if (isAdminRoute) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('redirectTo', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    // Account + checkout: allow but server actions will redirect as needed
  }

  // Admin-only routes: verify role from user metadata or DB
  if (isAdminRoute && user) {
    const userRole = user.user_metadata?.role as string | undefined;
    if (userRole !== 'ADMIN' && userRole !== 'STAFF') {
      // Redirect to home if not admin
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
