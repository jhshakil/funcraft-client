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
        path: "/recent-product",
      },
      {
        name: "Best Selling Product",
        path: "/best-selling-product",
      },
      {
        name: "Top Rated Product",
        path: "/top-rated-product",
      },
    ],
  },
  {
    name: "Category",
    path: "/category",
  },
  {
    name: "Deals",
    path: "#",
    elements: [
      {
        name: "Flash Sales",
        path: "/flash-sales",
      },
      {
        name: "Clearance",
        path: "/clearance",
      },
      {
        name: "Specific Discounts",
        path: "/special-discount",
      },
    ],
  },
  {
    name: "Shop",
    path: "/shop",
  },
];
