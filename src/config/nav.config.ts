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
        name: "Best Selling Product",
        path: "/product?sortBy=bestSelling&sortOrder=desc",
      },
      {
        name: "Recent Product",
        path: "/product?sortBy=createdAt&sortOrder=desc",
      },
      {
        name: "Top Rated Product",
        path: "/product?sortBy=ratting&sortOrder=desc",
      },
    ],
  },
  {
    name: "Flash Sales",
    path: "/product?flashSales=true",
  },
  {
    name: "Recent View",
    path: "/recent-product",
  },
  {
    name: "Shop",
    path: "/shop",
  },
  {
    name: "contact",
    path: "/contact",
  },
];
