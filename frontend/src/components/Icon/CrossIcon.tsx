import Icon from "./Icon";
import { ImCross } from "react-icons/im";

export default function CrossIcon({
  className = "w-[48px] h-[48px] bg-red-500",
  iconSize = 32,
}: {
  className?: string;
  iconSize?: number;
}) {
  return (
    <Icon className={className}>
      <ImCross color="white" size={32} />
    </Icon>
  );
}
