import Header from "../header";

interface Props {
  children: JSX.Element[] | JSX.Element | string;
  className?: string;
}

const Page = ({ children, className }: Props) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className={className + " grow"}>{children}</div>
    </div>
  );
};

export default Page;
