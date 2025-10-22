// Simple authentication for admin panel
// In production, you should use a proper auth service like NextAuth.js

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Senator69'; // Updated password

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminAuthToken', token);
  }
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminAuthToken');
}

export function clearAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminAuthToken');
  }
}

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  // Simple token validation - in production use JWT
  return token === 'authenticated';
}

export function generateAuthToken(): string {
  // Simple token generation - in production use JWT
  return 'authenticated';
}

