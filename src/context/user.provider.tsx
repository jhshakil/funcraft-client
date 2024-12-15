import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { TUser } from "@/types/user.types";
import { getCurrentUser } from "@/services/AuthService";
import { TCartData } from "@/types/product.types";

interface TUserProviderValues {
  user: TUser | null;
  isLoading: boolean;
  setUser: (user: TUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  cartData: TCartData[];
  updateCartData: (data: TCartData[]) => void;
}

const UserContext = createContext<TUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState<TCartData[] | []>([]);

  const handleUser = async () => {
    const user = await getCurrentUser();

    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  useEffect(() => {
    const savedState = localStorage.getItem("funcraftCart");
    if (savedState) {
      setCartData(JSON.parse(savedState));
    }
  }, []);

  const updateCartData = (data: TCartData[]) => {
    setCartData(data);
    localStorage.setItem("funcraftCart", JSON.stringify(data));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        cartData,
        updateCartData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;
