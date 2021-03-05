import { useState } from "react";
import MenuDropdown from "./MenuDropdown";
import {
  Alphabetically,
  ArrowDown,
  ArrowUp,
  Check,
  Completed,
  Date,
  MenuDots,
  Checks,
  Title,
} from "./icons/Icons";
import { RootState, useAppDispatch } from "../store";
import { toggleShowDates, toggleSortSettings } from "../slices/todos";
import { useSelector } from "react-redux";

type Settings = [
  title: string,
  settings: {
    rightIcon: JSX.Element;
    settingsTitle: string;
    onClick: any;
    setting: string;
    leftIcon?: (title?: string) => JSX.Element;
  }[]
][];

const arrowDirection = (conditional: boolean) =>
  conditional ? (
    <ArrowUp className="h-4 text-blue-500" />
  ) : (
    <ArrowDown className="h-4 text-blue-500" />
  );

const Menu = () => {
  // Modal state
  const [dropDownState, setDropdownState] = useState(false);
  // Popper stuff
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  // Filter Redux state
  const filterBy = useSelector((state: RootState) => state.filter.filterBy);
  const showDates = useSelector((state: RootState) => state.filter.showTitles);
  const ascending = useSelector((state: RootState) => state.filter.ascending);
  const dispatch = useAppDispatch();

  const settings = [
    [
      "Actions",
      [
        {
          rightIcon: <Checks className="h-5 w-5 mr-3" />,
          settingsTitle: "Select",
          onClick: () => {},
          setting: "select",
        },
      ],
    ],
    [
      "Sort",
      [
        {
          rightIcon: <Date className="h-5 w-5 mr-3" />,
          settingsTitle: "Day of creation",
          onClick: () => dispatch(toggleSortSettings("creation")),
          setting: "creation",
          leftIcon: (setting: string) =>
            filterBy === setting && arrowDirection(ascending),
        },
        {
          rightIcon: <Completed className="h-5 w-5 mr-3" />,
          settingsTitle: "Completion",
          onClick: () => dispatch(toggleSortSettings("completion")),
          setting: "completion",
          leftIcon: (setting: string) =>
            filterBy === setting && arrowDirection(ascending),
        },
        {
          rightIcon: <Alphabetically className="h-5 w-5 mr-3" />,
          settingsTitle: "Alphabetically",
          onClick: () => dispatch(toggleSortSettings("alphabetical")),
          setting: "alphabetical",
          leftIcon: (setting: string) =>
            filterBy === setting && arrowDirection(ascending),
        },
      ],
    ],
    [
      "Options",
      [
        {
          rightIcon: <Title className="h-5 w-5 mr-3" />,
          settingsTitle: "Show titles",
          onClick: () => {
            dispatch(toggleShowDates());
            setDropdownState(false);
          },
          setting: "select",
          leftIcon: () =>
            showDates && <Check className="h-5 w-5 text-blue-500" />,
        },
      ],
    ],
  ] as Settings;

  return (
    <div className="relative w-full flex justify-end py-2 z-10">
      <button
        className="mr-3 font-medium text-sm text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
        onClick={() =>
          setDropdownState((currentState) => (currentState = !dropDownState))
        }
        ref={setReferenceElement}
      >
        <MenuDots className="h-5 w-5 text-blue-500" />
      </button>
      <MenuDropdown
        referenceElement={referenceElement}
        dropDownState={dropDownState}
        setDropdownState={setDropdownState}
      >
        {settings.map(([title, settings], index) => (
          <div key={title + index}>
            <h6 className="px-2 pt-2 text-sm text-gray-500">{title}</h6>
            {settings.map(
              ({ rightIcon, settingsTitle, setting, onClick, leftIcon }) => (
                <button
                  key={settingsTitle}
                  className="w-full p-2 flex items-center justify-between font-medium text-gray-700 text-sm whitespace-nowrap focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  onClick={() => onClick()}
                >
                  <span className="flex items-center">
                    {rightIcon}
                    {settingsTitle}
                  </span>

                  {leftIcon ? leftIcon(setting) : null}
                </button>
              )
            )}
          </div>
        ))}
      </MenuDropdown>
    </div>
  );
};

export default Menu;
