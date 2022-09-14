export interface UserSessionData {
  email: string | null;
  userId: number | null;
  role: string | null;
}
const SessionManager = {
  getToken(): string | null {
    const token = sessionStorage.getItem('token');
    if (token) return token;
    else return null;
  },
  setUserSession(email: string, token: string, userId: number, role: string) {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', String(userId));
    sessionStorage.setItem('role', role);
  },
  removeUserSession() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
  },

  getUser(): UserSessionData {
    const user: UserSessionData = {
      email: sessionStorage.getItem('email'),
      userId: sessionStorage.getItem('userId')
        ? Number(sessionStorage.getItem('userId'))
        : null,
      role: sessionStorage.getItem('role'),
    };
    return user;
  },
};

export default SessionManager;
