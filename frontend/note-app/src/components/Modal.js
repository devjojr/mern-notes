import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, onClose }) => {
  return createPortal(
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">{children}</div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>,
    document.body
  );
};

export default Modal;
