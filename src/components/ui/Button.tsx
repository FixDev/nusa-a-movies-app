import type {
  FC,
  ReactNode,
  MouseEventHandler,
  ButtonHTMLAttributes,
} from "react";

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isSelected?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children: ReactNode;
}

export const Button: FC<Props> = ({
  onClick,
  isSelected = false,
  type = "button",
  children,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 border rounded-md font-medium transition cursor-pointer
        ${
          isSelected
            ? "bg-blue-600 text-white border-blue-600 dark:bg-cyan-500 dark:border-cyan-500"
            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
        }`}
    >
      {children}
    </button>
  );
};
