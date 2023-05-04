"use client";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { isTypeLiteralNode } from "typescript";
import Button from "../buttons/Button1";
import LinkButton from "../buttons/LinkButton";
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  SecondActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  SecondActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[60] outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full mobile:w-4/6 tablet:3/6 laptop:w-2/5 my-6 mx-auto h-full laptop:h-auto tablet:h-auto">
          {/* Contents */}
          <div
            className={`translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translalte-y-full"
            }  ${showModal ? "opacity-100" : "opacity-0"} `}
          >
            <div className="translate h-full laptop:h-auto mobile:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                  <IoMdClose size={24} onClick={handleClose} />
                </button>
                <div className="text-lg font-pops">{title}</div>
              </div>

              {/* Body */}
              <div className="relative p-6 flex-auto ">{body}</div>
              {/* Footer */}
              <div className="flex flex-col p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && SecondActionLabel && (
                   <Button
                   outline
                   label={SecondActionLabel}
                   onClick={handleSubmit}
                   disabled={disabled}
                  />
                  )}
                  <Button label={actionLabel}
                    onClick={handleSubmit}
                    disabled={disabled} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
