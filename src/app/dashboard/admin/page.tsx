import PaymentLineChart from "@/components/shared/PaymentLineChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatsByAdmin } from "@/services/StatsService";

const page = async () => {
  const stats = await getStatsByAdmin();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.data?.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.data?.totalProducts}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.data?.totalSales}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.data?.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.data?.totalShops}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Review</CardTitle>
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
            <CardTitle>Monthly Sells</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PaymentLineChart statsData={stats?.data?.monthlySales} />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Yearly Sells</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PaymentLineChart statsData={stats?.data?.yearlySales} />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Orders</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PaymentLineChart statsData={stats?.data?.monthlyOrders} />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Yearly Orders</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PaymentLineChart statsData={stats?.data?.yearlyOrders} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
