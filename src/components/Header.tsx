import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";

const routes = [
  { label: "Home", pathname: "/" },
  { label: "Search", pathname: "/build-your-own" },
  // { label: "Pre-made tables", pathname: "/pre-made-tables" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header>
      <Menu
        items={routes.map((route, index) => ({
          key: route.pathname,
          label: route.label,
          onClick: () => router.push(route.pathname),
        }))}
        mode="horizontal"
        selectedKeys={[pathname]}
        style={{ padding: "0.25rem 2rem" }}
      />
    </header>
  );
};

//

export default Header;
