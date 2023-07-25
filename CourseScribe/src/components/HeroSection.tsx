import Background from "./Background";
import Container from "./Container";

function HeroSection() {
  return (
    <div className="relative" id="home">
      <Background />
      <Container>
        <div className="relative ml-auto pt-36">
          <div className="mx-auto text-center lg:w-2/3">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white md:text-6xl xl:text-7xl">
              Never watch another{" "}
              <span className="text-primary dark:text-white">lecture.</span>
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300">
              LectureGPT uses AI to watch your lectures for you. Just upload
              your lecture and we'll give you a complete transcription along
              with notes that are digestible and easy to understand.
            </p>
            <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-4">
              <a
                href="#"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white">
                  Get started
                </span>
              </a>
              <a
                href="#"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
              >
                <span className="relative text-base font-semibold text-primary dark:text-white">
                  Learn more
                </span>
              </a>
            </div>
            <div className="mt-16 flex flex-col items-center border-y border-gray-100 py-8 dark:border-gray-800 lg:flex-row lg:justify-between">
              <div className="">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Sign In
                </h6>
                <img
                  src="./images/clients/microsoft.svg"
                  className="mx-auto h-12 w-auto"
                  loading="lazy"
                  alt="desc logo"
                  width=""
                  height=""
                />
              </div>
              <div className="">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Upload lecture
                </h6>
                <img
                  src="./images/clients/microsoft.svg"
                  className="mx-auto h-12 w-auto"
                  loading="lazy"
                  alt="desc logo"
                  width=""
                  height=""
                />
              </div>
              <div className="">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Get notes
                </h6>
                <img
                  src="./images/clients/microsoft.svg"
                  className="mx-auto h-12 w-auto"
                  loading="lazy"
                  alt="desc logo"
                  width=""
                  height=""
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HeroSection;
