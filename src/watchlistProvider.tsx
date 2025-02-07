import { createContext, useContext, useEffect } from "react";

export const AuthContext = createContext<GlobalContent>({
  isLoggedIn: false, // set a default value
  setIsLoggedIn: (_value: boolean) => {},
  handleLogOut: () => {},
  idleExpiresAt: 1000,
  idleTime: 0,
});

export const useAuthContext = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // initializes state as false
  // Router for redirecting users and checking paths
  const router = useRouter();
  const pathname = usePathname();
  // "Idle Timer" for session expiration
  const { idleTime, handleUserInteraction } = useIdleTimer();
  // Session Expiration determines limit of how many seconds until session expires/logout
  const [idleExpiresAt, setIdleExpiresAt] = useState(180);
  //   const [expirationDate, setExpirationDate] = useState();

  //Updates on initial render
  useEffect(() => {
    const storedId = localStorage.getItem("expires-at");
    if (storedId) {
      setIsLoggedIn(true);
      console.log(isLoggedIn);
    }
  }, []);

  // Keeps user out of protected routes
  useEffect(() => {
    if (isLoggedIn && unprotectedRoutes.includes(pathname)) {
      router.push("/dashboard");
      console.log(isLoggedIn);
    } else if (!isLoggedIn && protectedRoutes.includes(pathname)) {
      router.push("/login");
      console.log("You do not have permission to be here, please log in");
      handleLogOut();
    }
  }, [isLoggedIn]);

  const handleLogOut = () => {
    localStorage.removeItem("login-expires");
    setIsLoggedIn(false);
    console.log(isLoggedIn);
  };

  // Expires session when the  to session expiration
  useEffect(() => {
    if (isLoggedIn && idleTime === idleExpiresAt) {
      handleLogOut();
      console.log(
        "Session expired, you have been logged out due to inactivity"
      );
      router.push("/home"); //sends user back to home page since they are no longer logged in
    }
  }, [idleTime]); // Execute every time the idle timer updates

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        handleLogOut,
        idleTime,
        idleExpiresAt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
