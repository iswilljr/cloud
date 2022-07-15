import Image from "next/image";
import GithubIcon from "icons/Github";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="mb-4 text-4xl">Select your UI</h1>
      <div className="flex items-center space-x-2">
        <UiCard name="Deno" src="/deno/logo.svg" to="/deno/home" />
        <UiCard name="Github" logo={GithubIcon} to="/github/home" />
      </div>
    </div>
  );
};

interface UiCardProps {
  name: string;
  src?: string;
  logo?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  to: string;
}

function UiCard({ name, src, logo: Logo, to }: UiCardProps) {
  return (
    <a
      href={to}
      className="flex h-48 w-48 flex-col items-center justify-center rounded-lg border-4 border-transparent p-3 hover:border-gray-500 hover:shadow-lg focus:border-gray-500 focus:shadow-lg"
    >
      {src ? (
        <Image width={100} height={100} src={src} alt={name} />
      ) : (
        Logo && <Logo width={115} height={115} className="" />
      )}
      <div className="text-2xl font-bold">{name}</div>
    </a>
  );
}

export default Home;
