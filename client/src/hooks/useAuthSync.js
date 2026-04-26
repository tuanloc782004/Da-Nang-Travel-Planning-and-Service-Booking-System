import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

export const useAuthSync = () => {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { getToken } = useAuth();
  const [dbUser, setDbUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sync = async () => {
      if (isLoaded && isSignedIn && clerkUser) {
        try {
          const token = await getToken();
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/sync`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ clerkId: clerkUser.id }),
          });
          const result = await response.json();
          if (result.success) {
            setDbUser(result.data); // Lưu thông tin MongoDB (gồm role)
          }
        } catch (error) {
          console.error("Lỗi đồng bộ user:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (isLoaded && !isSignedIn) {
        setDbUser(null);
        setIsLoading(false);
      }
    };

    sync();
  }, [isLoaded, isSignedIn, clerkUser, getToken]);

  return { dbUser, isLoading, isSignedIn };
};