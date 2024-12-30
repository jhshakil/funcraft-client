export const NavbarConfig = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Product",
    path: "#",
    elements: [
      {
        name: "All Product",
        path: "/product",
      },
      {
        name: "Recent Product",
        path: "/product?recent=true",
      },
      {
        name: "Best Selling Product",
        path: "/product?bestSelling=true",
      },
      {
        name: "Top Rated Product",
        path: "/product?topRated=true",
      },
    ],
  },
  {
    name: "Flash Sales",
    path: "/product?flashSales=true",
  },
  {
    name: "Clearance",
    path: "/product?clearance=true",
  },
  {
    name: "Discounts",
    path: "/product?discounts=true",
  },
  {
    name: "Shop",
    path: "/shop",
  },
];
