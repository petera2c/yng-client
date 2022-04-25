import Link from "next/link";

const Header = () => {
  return (
    <header className="flex gap-4 bg-white py-4 px-4">
      <HeaderButton buttonText="Home" link="/" />
      <HeaderButton buttonText="Graphs" link="/graphs" />
      <HeaderButton buttonText="Stocks" link="/stocks" />
    </header>
  );
};

interface Props {
  buttonText: string;
  link: string;
}

const HeaderButton = ({ buttonText, link }: Props) => {
  return (
    <Link href={link}>
      <a>{buttonText}</a>
    </Link>
  );
};

export default Header;
