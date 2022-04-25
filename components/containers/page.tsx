import Head from "next/head";
import Header from "../header";

interface Props {
  children: JSX.Element[] | JSX.Element | string;
  className?: string;
  title: string;
}

const Page = ({ children, className, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col h-screen">
        <Header />
        <div className={className + " grow py-4 px-4"}>{children}</div>
      </div>
    </>
  );
};

export default Page;
