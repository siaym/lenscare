import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/db';
import type { UserProfile } from '@prisma/client';

// ============================================================
// Server-side auth helpers — use in Server Components & Actions
// ============================================================

/**
 * Get the current Supabase auth user (server-side)
 * Returns null if not authenticated
 */
export async function getAuthUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;
  return user;
}

/**
 * Get the current user's profile from our database
 * Creates profile if it doesn't exist (first login via OAuth etc.)
 */
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const user = await getAuthUser();
  if (!user) return null;

  let profile = await prisma.userProfile.findUnique({
    where: { userId: user.id },
  });

  // Auto-create profile on first visit
  if (!profile) {
    profile = await prisma.userProfile.create({
      data: {
        userId: user.id,
        email: user.email!,
        name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatarUrl: user.user_metadata?.avatar_url || null,
        role: 'CUSTOMER',
      },
    });
  }

  return profile;
}

/**
 * Require authentication — throws redirect if not logged in
 */
export async function requireAuth() {
  const user = await getAuthUser();
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }
  return user;
}

/**
 * Require admin role
 */
export async function requireAdmin() {
  const profile = await getCurrentUserProfile();
  if (!profile || (profile.role !== 'ADMIN' && profile.role !== 'STAFF')) {
    throw new Error('FORBIDDEN');
  }
  return profile;
}

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const profile = await getCurrentUserProfile();
  return profile?.role === 'ADMIN' || profile?.role === 'STAFF';
}
