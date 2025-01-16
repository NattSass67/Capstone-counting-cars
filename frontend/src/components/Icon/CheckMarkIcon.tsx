import Icon from "./Icon";
import { ImCheckmark } from "react-icons/im";

export default function CheckMarkIcon({
  className = "w-[48px] h-[48px] bg-lime-500",
  iconSize = 32,
}: {
  className?: string;
  iconSize?: number;
}) {
  return (
    <Icon className={className}>
      <ImCheckmark color="white" size={32} />
    </Icon>
  );
}
