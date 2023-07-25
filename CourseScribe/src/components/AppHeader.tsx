import { signIn } from "next-auth/react";
import Container from "./Container";

function AppHeader() {
  return (
    <header>
      <nav className="absolute z-10 w-full">
        <Container>
          <div className="relative flex flex-row items-center justify-between gap-6 py-2">
            <div className="relative z-20 flex  w-max justify-between">
              <a
                href="/"
                aria-label="logo"
                className="flex items-center space-x-2"
              >
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  Lecture<span className="text-primary">GPT</span>
                </span>
              </a>
            </div>
            <div
              className="visible relative flex w-7/12 translate-y-0 scale-100 flex-row items-center justify-end gap-0 
                             bg-transparent
                            peer-checked:visible peer-checked:translate-y-0 peer-checked:scale-100 peer-checked:opacity-100 
                            dark:border-gray-700 dark:bg-gray-800 dark:shadow-none"
            >
              <div className=" w-auto pr-4 pt-0 text-gray-600 dark:text-gray-300">
                <ul className="flex flex-row gap-0 text-sm font-medium tracking-wide">
                  <li>
                    <a
                      onClick={() => signIn()}
                      className="block px-4 transition hover:text-primary"
                    >
                      <span className="cursor-pointer">Sign In</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-0">
                <a
                  onClick={() => signIn()}
                  className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                >
                  <span className="relative cursor-pointer text-sm font-semibold text-white">
                    Sign Up
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}

export default AppHeader;
