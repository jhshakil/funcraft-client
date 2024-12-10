import EditorAdminProfile from "@/components/user/EditAdminProfile";
import { getCurrentUser } from "@/services/AuthService";
import { getUser } from "@/services/UserService";
import { TAdminData } from "@/types/user.types";

const Page = async () => {
  const user = await getCurrentUser();

  let userData: { data: TAdminData } | null = null;

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
        <EditorAdminProfile userData={userData?.data} />
      </div>
    </div>
  );
};

export default Page;
