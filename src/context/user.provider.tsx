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
import { TCartData, TProductData } from "@/types/product.types";

interface TUserProviderValues {
  user: TUser | null;
  isLoading: boolean;
  setUser: (user: TUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  cartData: TCartData[];
  updateCartData: (data: TCartData[]) => void;
  recentProduct: TProductData[];
  updateRecentProduct: (data: TProductData[]) => void;
}

const UserContext = createContext<TUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState<TCartData[] | []>([]);
  const [recentProduct, setRecentProduct] = useState<TProductData[] | []>([]);

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
    const saveRecent = localStorage.getItem("funcraftRecent");
    if (savedState) {
      setCartData(JSON.parse(savedState));
    }
    if (saveRecent) {
      setRecentProduct(JSON.parse(saveRecent));
    }
  }, []);

  const updateCartData = (data: TCartData[]) => {
    setCartData(data);
    localStorage.setItem("funcraftCart", JSON.stringify(data));
  };

  const updateRecentProduct = (data: TProductData[]) => {
    setRecentProduct(data);
    localStorage.setItem("funcraftRecent", JSON.stringify(data));
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
        recentProduct,
        updateRecentProduct,
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
