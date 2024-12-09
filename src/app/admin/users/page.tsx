import UserList from "@/components/user/UserList";
import { getAllUser } from "@/services/UserService";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const users = await getAllUser({ page: searchParams.page || "1" });
  return (
    <div className="mt-5">
      <div>
        <h1 className="text-3xl">Users</h1>
      </div>
      <div className="mt-11">
        <UserList
          users={users.data}
          meta={users.meta}
          currentPage={searchParams.page || "1"}
          path="/admin/users"
        />
      </div>
    </div>
  );
};

export default Page;
