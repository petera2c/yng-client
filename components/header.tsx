import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/router";

const routes = [
  { label: "Home", pathname: "/" },
  { label: "Go to app", pathname: "/app" },
  { label: "Pre-made tables", pathname: "/pre-made-tables", includes: true },
];

const Header = () => {
  const { pathname } = useRouter();

  return (
    <header className="flex gap-4 bg-white shadow py-4 px-16">
      {routes.map((route, index) => (
        <HeaderButton
          index={index}
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
  index,
  label,
  isActive,
  link,
}: {
  index: any;
  label: string;
  isActive: any;
  link: string;
}) => {
  const className = useMemo(
    () => `${isActive ? "button-pill active" : "button-pill"}`,
    [isActive]
  );
  return (
    <Link href={link}>
      <button className={className}>{label}</button>
    </Link>
  );
};

export default Header;
