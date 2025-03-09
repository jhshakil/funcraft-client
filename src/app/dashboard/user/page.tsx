import PaymentLineChart from "@/components/shared/PaymentLineChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/services/AuthService";
import { getStatsByCustomer } from "@/services/StatsService";
import { getUser } from "@/services/UserService";
import { TCustomerData } from "@/types/user.types";

const page = async () => {
  const user = await getCurrentUser();
  let userData: { data: TCustomerData } | null = null;

  try {
    if (user?.id) {
      userData = await getUser(user?.id as string);
    }
  } catch (error) {
    console.log(error);
  }

  const stats = await getStatsByCustomer({
    customerId: userData?.data?.id as string,
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <h1 className="text-3xl">Dashboard</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.data?.totalOrders}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.data?.totalPayment}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.data?.totalReviews}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 ">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>This Month Total Cost</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <PaymentLineChart statsData={stats?.data?.monthlyPayments} />
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>This Year Total Cost</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <PaymentLineChart statsData={stats?.data?.yearlyPayments} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default page;
