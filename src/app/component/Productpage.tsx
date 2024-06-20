import React from "react";

const Productpage = () => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
              alt="mockup"
            />
          </div>
          <div className="ml-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              Payments tool for software companies
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              From checkout to global sales tax compliance, companies around the
              world use Flowbite to simplify their payment stack.
            </p>
            <div className="card p-4 min-h-32 rounded-md m-auto bg-gray-900 flex flex-col gap-5 justify-center items-center w-3/4">
              <div className="top flex w-full justify-around">
                <p className="text-white">
                  Current Price : <span>₹ 22999</span>
                </p>
                <p className="text-white">Reviews : 12657</p>
              </div>
              <div className="bottom flex w-full justify-around">
                <p className="text-white">
                  Lowest Price : <span>₹ 22999</span>{" "}
                </p>
                <p className="text-white">Highest Price :₹ 22999 </p>
              </div>
              <div className="button">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Set Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Productpage;
