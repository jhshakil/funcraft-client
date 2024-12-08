import UserList from "@/components/user/UserList";
import { getAllUser } from "@/services/UserService";

const page = async () => {
  const users = await getAllUser();
  return (
    <div className="mt-5">
      <div>
        <h1 className="text-3xl">Users</h1>
      </div>
      <div className="mt-11">
        <UserList users={users.data} meta={users.meta} />
      </div>
    </div>
  );
};

export default page;
