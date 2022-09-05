import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/router";

const routes = [
  { label: "Home", pathname: "/" },
  { label: "Go to app", pathname: "/build-your-own" },
  { label: "Pre-made tables", pathname: "/pre-made-tables", includes: true },
];

const Header = () => {
  const { pathname } = useRouter();

  return (
    <header className="flex gap-4 bg-white shadow py-4 px-16">
      {routes.map((route, index) => (
        <HeaderButton
          isActive={
            route.includes
              ? pathname.includes(route.pathname)
              : pathname === route.pathname
          }
          key={index}
          label={route.label}
          link={route.pathname}
        />
      ))}
    </header>
  );
};

const HeaderButton = ({
  label,
  isActive,
  link,
}: {
  label: string;
  isActive: any;
  link: string;
}) => {
  const className = useMemo(
    () => `button-text ${isActive && "active"}`,
    [isActive]
  );
  return (
    <Link href={link}>
      <button className={className}>{label}</button>
    </Link>
  );
};

export default Header;
