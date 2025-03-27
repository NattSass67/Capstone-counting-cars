import ButtonK0 from "./ButtonK0";

export default function ButtonK1({
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
    <ButtonK0
      showIconLeft={showIconLeft}
      IconLeft={IconLeft}
      text={text}
      showIconRight={showIconRight}
      IconRight={IconRight}
      className={
        className +
        "border-[2.5px] border-yellow-950 text-white text-base font-bold bg-orange-500 rounded-[999px] hover:bg-orange-600 "
      }
      type={type}
      onClick={onClick}
    />
  );
}
