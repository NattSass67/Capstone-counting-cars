import Icon from "./Icon/Icon";
import { IoIosInformationCircle } from "react-icons/io";

export default function AppHeader() {
  const appName = "Some Name: Fill Later"; // TODO: Fill Later
  return (
    <div className="w-full h-[80px] flex flex-row items-center justify-between bg-orange-400 px-[56px]">
      <h1 className="font-bold text-amber-950 shadow-2xl self-center leading-none text-3xl">
        {appName}
      </h1>
      <Icon className="bg-orange-800 w-[48px] h-[48px]" clickable={false}>
        <IoIosInformationCircle size={32} color="white" />
      </Icon>
    </div>
  );
}
