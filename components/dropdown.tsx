/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export type Option = {
  label: string;
  value: string;
};

const Dropdown = ({
  initialIndex = 0,
  onValueChange,
  options,
  title,
}: {
  initialIndex?: number;
  onValueChange: Dispatch<SetStateAction<any>>;
  options: Option[];
  title: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    onValueChange(options[activeIndex]);
  }, [activeIndex, onValueChange]);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 hover:border-purple-500 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          {title}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="origin-top-right absolute z-10 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-48 overflow-auto">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                className={classNames(
                  activeIndex === index
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700",
                  "w-full px-4 py-2 text-sm"
                )}
                key={index}
                onClick={() => setActiveIndex(index)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
