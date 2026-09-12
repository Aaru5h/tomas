export { auth as middleware } from '@/auth';

export const config = {
  // ponytail: only protect routes you actually need protected — add paths here
  matcher: ['/dashboard/:path*'],
};
