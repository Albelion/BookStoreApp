export interface UserSessionData {
  email: string | null;
  userId: number | null;
  role: string | null;
  phoneNumber: string | null;
  fullName: string | null;
}
const SessionManager = {
  getToken(): string | null {
    const token = sessionStorage.getItem('token');
    if (token) return token;
    else return null;
  },
  setUserSession(
    email: string,
    token: string,
    userId: number,
    role: string,
    phoneNumber: string,
    fullName: string,
  ) {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', String(userId));
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('phoneNumber', phoneNumber);
    sessionStorage.setItem('fullName', fullName);
  },
  removeUserSession() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('phoneNumber');
    sessionStorage.removeItem('fullName');
  },

  getUser(): UserSessionData {
    const user: UserSessionData = {
      email: sessionStorage.getItem('email'),
      userId: sessionStorage.getItem('userId')
        ? Number(sessionStorage.getItem('userId'))
        : null,
      role: sessionStorage.getItem('role'),
      phoneNumber: sessionStorage.getItem('phoneNumber'),
      fullName: sessionStorage.getItem('fullName'),
    };
    return user;
  },
};

export default SessionManager;
