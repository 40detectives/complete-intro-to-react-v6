import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

let modalRoot;

const Modal = ({ children }) => {
  modalRoot = modalRoot ? modalRoot : document.querySelector("#modal");

  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    // function returned is the one that will be used for cleaning up:
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
