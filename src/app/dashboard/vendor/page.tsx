import PaymentLineChart from "@/components/shared/PaymentLineChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/services/AuthService";
import { getShopByVendorId } from "@/services/ShopService";
import { getStatsByVendor } from "@/services/StatsService";

const page = async () => {
  const user = await getCurrentUser();
  const shop = await getShopByVendorId(user?.id as string);

  const stats = await getStatsByVendor({
    shopId: shop?.data?.id,
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
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
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.data?.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sells</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.data?.totalSales}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 ">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Sell</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PaymentLineChart statsData={stats?.data?.monthlySales} />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Yearly Sell</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PaymentLineChart statsData={stats?.data?.yearlySales} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
