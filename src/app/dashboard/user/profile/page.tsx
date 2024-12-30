import EditorUserProfile from "@/components/user/EditUserProfile";
import { getCurrentUser } from "@/services/AuthService";
import { getUser } from "@/services/UserService";
import { TCustomerData } from "@/types/user.types";

const Page = async () => {
  const user = await getCurrentUser();

  let userData: { data: TCustomerData } | null = null;

  try {
    if (user?.id) {
      userData = await getUser(user?.id as string);
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="mt-5">
      <div>
        <h1 className="text-3xl">Profile</h1>
      </div>
      <div className="mt-11 flex flex-col gap-11">
        <EditorUserProfile userData={userData?.data} />
      </div>
    </div>
  );
};

export default Page;
