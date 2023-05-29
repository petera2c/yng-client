import Head from "next/head";
import Header from "../Header";

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
      <div className="flex flex-col" style={{ height: "calc(100vh - 72px)" }}>
        <div className={className + " flex flex-col grow p-4"}>{children}</div>
      </div>
    </>
  );
};

export default Page;
