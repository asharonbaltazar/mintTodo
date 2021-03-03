import {
  Alphabetically,
  ArrowDown,
  ArrowUp,
  Check,
  Completed,
  Date,
} from "./icons/Icons";
import { PortalWithState } from "react-portal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { toggleSortSettings, toggleShowDates } from "../slices/todos";

const settings = [
  {
    icon: <Date className="h-5 w-5 mr-3" />,
    title: "Day of creation",
    filterFunction: toggleSortSettings,
    setting: "creation",
  },
  {
    icon: <Completed className="h-5 w-5 mr-3" />,
    title: "Completion",
    filterFunction: toggleSortSettings,
    setting: "completion",
  },
  {
    icon: <Alphabetically className="h-5 w-5 mr-3" />,
    title: "Alphabetically",
    filterFunction: toggleSortSettings,
    setting: "alphabetical",
  },
];

const arrowDirection = (conditional: boolean) =>
  conditional ? (
    <ArrowUp className="h-4 text-blue-500" />
  ) : (
    <ArrowDown className="h-4 text-blue-500" />
  );

const Filter = () => {
  const filterBy = useSelector((state: RootState) => state.filter.filterBy);
  const showDates = useSelector((state: RootState) => state.filter.showDates);
  const ascending = useSelector((state: RootState) => state.filter.ascending);
  const dispatch = useAppDispatch();

  return (
    <div className="relative flex justify-end py-2 z-10" id="sort">
      <PortalWithState
        closeOnOutsideClick
        closeOnEsc
        node={document && document.getElementById("sort")}
      >
        {({ openPortal, closePortal, isOpen, portal }) => (
          <>
            <button
              className="font-medium text-sm text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
              onClick={() => openPortal()}
            >
              Sort
            </button>
            {portal(
              <div className="w-52 absolute top-10 right-0 p-2 space-y-2 divide-y divide-gray-600 bg-white border-2 border-blue-400 rounded-lg shadow-xl">
                <div className="space-y-2">
                  {settings.map(({ icon, title, filterFunction, setting }) => (
                    <button
                      key={title}
                      className="w-full flex items-center justify-between font-medium text-gray-700 text-sm whitespace-nowrap focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                      onClick={() => dispatch(filterFunction(setting))}
                    >
                      <span className="flex items-center">
                        {icon}
                        {title}
                      </span>

                      {filterBy === setting && arrowDirection(ascending)}
                    </button>
                  ))}
                </div>
                <div className="w-full pt-2 pb-1">
                  <button
                    className="w-full flex items-center justify-between font-medium text-gray-700 text-sm text-left rounded-sm focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                    onClick={() => dispatch(toggleShowDates())}
                  >
                    <span>Show titles</span>
                    {showDates && <Check className="h-5 w-5 text-blue-500" />}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </PortalWithState>
    </div>
  );
};

export default Filter;
