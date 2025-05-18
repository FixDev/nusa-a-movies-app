import type {
  FC,
  ReactNode,
  MouseEventHandler,
  ButtonHTMLAttributes,
} from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      type={type}
      className={`px-3 py-2 rounded-md text-sm font-medium transition ${
        isSelected
          ? "bg-blue-600 text-white"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      } ${className}`}
    >
      {children}
    </button>
  );
};
