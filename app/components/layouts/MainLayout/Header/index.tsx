import { FC } from "react";
import Link from "next/link";
import Button from "../../../common/Button";
import { signOut } from "next-auth/react";

const Header: FC = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-20">
      <nav className="flex flex-row items-center p-5">
        <div>
          <Link href="/">
            <a className="text-lg text-gray-300 font-bold flex items-center">
              Veteran
            </a>
          </Link>
        </div>
        <div className="container mx-auto px-10">
          <Link href="/disability-rating">
            <a className="font-bold text-gray-600 hover:text-black">
              Disability Rating
            </a>
          </Link>
          <Link href="/claims">
            <a className="font-bold text-gray-600 hover:text-black ml-8">
              Benefits Claims
            </a>
          </Link>
          <Link href="/intent-to-file">
            <a className="font-bold text-gray-600 hover:text-black ml-8">
              Intent to File
            </a>
          </Link>
        </div>
        <div className="ml-auto">
          <Button
            variant="text"
            className="font-medium py-1"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
