/*
Name: Button
Description: Button
Properties: 
  Size: 'medium' | 'small' (default: 'medium')
  Color: 'white' | 'secondary' | 'opaque' | 'primary' | 'ghost' (default: 'white')
  State: 'default' | 'disabled'
  IconRight: true | false (default: false)
  onClick: function,
  Custom: false | true (default: false)
  Padding: string (active when Custom={true})
*/
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { colors, sizes } from "../constants/button";
import { NormalButtonProps } from "./types";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

function Button({
  color = "white",
  size = "medium",
  state = "default",
  iconRight = false,
  custom = false,
  children,
  padding = "",
  isOpen = null,
  handleOpen = () => {},
  handleItemClick = (index) => {},
  onClick = () => {},
  dropItem = [],
  form = null,
}: NormalButtonProps) {
  //const [isOpen, setIsOpen] = useState(false)
  /*const handleOpen = () => {
    setIsOpen(!isOpen)
    onClick()
  }*/

  // const handleItemClick = (index) => {
  //   handleOpen()
  //   handleItemClick(index)
  // }
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className=" min-w-fit min-h-fit flex-1 flex relative"
    >
      <motion.button
        className={`text-body-md min-w-fit min-h-fit flex-1 flex items-center font-pops justify-center gap-4 relative ease-out duration-300 ${
          state === "default" ? "cursor-pointer" : "cursor-default"
        } rounded-lg ${colors[color]} ${custom ? padding : sizes[size]}`}
        whileHover={state === "default" ? { scale: 1.05 } : { scale: 1 }}
        whileTap={state === "default" ? { scale: 0.9 } : { scale: 1 }}
        onClick={iconRight ? handleOpen : onClick}
        form={form}
        type="submit"
      >
        {children}
        {/* this is icon right */}
        {iconRight && (
          <motion.div
            variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </motion.div>
        )}
      </motion.button>
      {/* this is dropdown button */}
      {iconRight && (
        <motion.ul
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0%)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50%)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
          className={`w-full max-h-80 rounded-lg flex flex-col gap-10 list-none m-0 mt-5 py-2 absolute -bottom-2 translate-y-full ${colors[color]}`}
        >
          {dropItem.map((item, index) => (
            <motion.li
              variants={itemVariants}
              key={index}
              className="pl-4 cursor-pointer"
              onClick={() => handleItemClick(index)}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}

export default Button;
