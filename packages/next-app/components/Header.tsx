import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import Account from "./Account";
import { PlusIcon } from "@heroicons/react/solid";
import ConnectWallet from "./ConnectWallet";

const Header = () => {
  const { active, error } = useWeb3React();
  return (
    <div className="flex flex-col w-full sm:max-w-4xl mx-auto px-4 pt-4 sm:px-20 sm:pt-8">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col sm:flex-row">
          <Link passHref href="/">
            {/* <a className="text-4xl hover:text-indigo-500 font-serif">
              wgmi
              <span className="text-4xl text-gray-300">.gg</span>
            </a> */}
            <a className="text-4xl hover:text-indigo-500 font-serif">
              Verified
              <span className="text-4xl text-gray-400">Links</span>
            </a>
          </Link>
          {/* <p className="text-sm text-gray-500 self-end mb-1 sm:ml-2">
            official links for projects
          </p> */}
        </div>
        <div className="flex flex-row items-center">
          <ThemeToggle size="h-7" />
          <Link href="/projects/new">
            <button
              type="button"
              className="inline-flex items-center mx-8 px-4 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Project
            </button>
          </Link>
          {/* <a
            href="https://airtable.com/shrnnT4MVlDMaRO4I"
            target="_blank"
            className="mx-4 text-sm text-gray-500 hover:text-purple-500 cursor-pointer"
          >
            send feedback
          </a> */}
          {active ? <Account /> : <ConnectWallet />}
        </div>
      </div>
    </div>
  );
};

export default Header;
