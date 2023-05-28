import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "antd";

const routes = [
  { label: "Home", pathname: "/" },
  { label: "Search", pathname: "/build-your-own" },
  { label: "Pre-made tables", pathname: "/pre-made-tables", includes: true },
];

const Header = () => {
  const { pathname } = useRouter();

  return (
    <header className="flex gap-1 bg-white shadow py-1 px-4">
      {routes.map((route, index) => {
        const isActive = route.includes
          ? pathname.includes(route.pathname)
          : pathname === route.pathname;

        return (
          <Link href={route.pathname} key={index}>
            <Button type="primary">{route.label}</Button>
          </Link>
        );
      })}
    </header>
  );
};

export default Header;
