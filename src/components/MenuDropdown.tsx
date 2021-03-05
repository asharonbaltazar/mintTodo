import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { usePopper } from "react-popper";
import Modal from "react-modal";

interface IProps {
  referenceElement: HTMLElement | null;
  dropDownState: boolean;
  setDropdownState: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const MenuDropdown = ({
  referenceElement,
  dropDownState,
  setDropdownState,
  children,
}: IProps) => {
  // Popper stuff
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
      },
    ],
    placement: "auto-end",
    strategy: "absolute",
  });

  // react-modal source root
  Modal.setAppElement(document.getElementById("root")!);
  return (
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
        className="w-52 bg-white border-2 border-blue-400 rounded-lg shadow-xl"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className="py-2">{children}</div>
      </div>
    </Modal>
  );
};

export default MenuDropdown;
