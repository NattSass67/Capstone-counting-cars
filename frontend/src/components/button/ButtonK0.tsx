'use client'

export default function ButtonK0({
  showIconLeft = false,
  IconLeft = null,
  text,
  showIconRight = false,
  IconRight = null,
  className = "",
  type = "button",
  onClick = () => {},
}: {
  showIconLeft?: boolean;
  showIconRight?: boolean;
  text: string;
  IconLeft?: React.ReactNode;
  IconRight?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        className +
        "rounded-[999px] px-[24px] py-[16px] flex flex-row justify-center items-center space-x-[24px]"
      }
      type={type}
    >
      {showIconLeft && IconLeft}
      <h1>{text}</h1>
      {showIconRight && IconRight}
    </button>
  );
}
