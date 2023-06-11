import { Menu } from "antd";
import { useRouter } from "next/navigation";

const routes = [
  { label: "Home", pathname: "/" },
  { label: "Search", pathname: "/build-your-own" },
  { label: "Pre-made tables", pathname: "/pre-made-tables" },
];

const Header = () => {
  const router = useRouter();

  return (
    <header>
      <Menu
        items={routes.map((route, index) => ({
          key: index,
          label: route.label,
          onClick: () => router.push(route.pathname),
        }))}
        mode="horizontal"
        style={{ padding: "0.25rem 2rem" }}
      />
    </header>
  );
};

//

export default Header;
