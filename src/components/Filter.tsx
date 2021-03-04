import {
  Alphabetically,
  ArrowDown,
  ArrowUp,
  Check,
  Completed,
  Date,
} from "./icons/Icons";
import { usePopper } from "react-popper";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { toggleSortSettings, toggleShowDates } from "../slices/todos";
import { useState } from "react";

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
  // Modal state
  const [dropDownState, setDropdownState] = useState(false);
  // Popper stuff
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
      },
    ],
    placement: "bottom-end",
    strategy: "absolute",
  });
  // Filter Redux state
  const filterBy = useSelector((state: RootState) => state.filter.filterBy);
  const showDates = useSelector((state: RootState) => state.filter.showTitles);
  const ascending = useSelector((state: RootState) => state.filter.ascending);
  const dispatch = useAppDispatch();

  // react-modal source root
  Modal.setAppElement(document.getElementById("root")!);
  return (
    <div className="relative flex justify-end py-2 z-10">
      <button
        className="font-medium text-sm text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
        onClick={() =>
          setDropdownState((currentState) => (currentState = !dropDownState))
        }
        ref={setReferenceElement}
      >
        Sort
      </button>
      <Modal
        onRequestClose={() => setDropdownState(false)}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        isOpen={dropDownState}
        style={{
          overlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "",
          },
          content: {
            position: "initial",
            top: "initial",
            left: "initial",
            right: "initial",
            bottom: "initial",
            border: "initial",
            background: "#fff",
            overflow: "initial",
            WebkitOverflowScrolling: "touch",
            borderRadius: "initial",
            outline: "initial",
            padding: "initial",
          },
        }}
      >
        <div
          className="w-52 p-2 space-y-2 divide-y divide-gray-600 bg-white border-2 border-blue-400 rounded-lg shadow-xl"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
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
      </Modal>
    </div>
  );
};

export default Filter;
