import Image from "next/image";
import Icon from "./Icon/Icon";
import CheckMarkIcon from "./Icon/CheckMarkIcon";
import CrossIcon from "./Icon/CrossIcon";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonK1 from "./button/ButtonK1";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { TbReload } from "react-icons/tb";

export default function SingleSubJob({
  status,
  resultUrl,
  imageUrl = "/img/traffic.jpg",
}: {
  status: number;
  resultUrl: string;
  imageUrl?: string;
}) {
  let statustext = "";
  let buttontext = "";
  let icon = <Icon>{null}</Icon>;
  let buttonIcon = <IoMdSearch />;
  if (status == 0) {
    statustext = "กำลังประมวลผล...";
    buttontext = "ยกเลิก";
    icon = <CircularProgress sx={{ color: "#92400e" }} />;
    buttonIcon = <MdOutlineCancel />;
  } else if (status == 1) {
    statustext = "ประมวลผลเสร็จเเล้ว";
    buttontext = "ดูผลลัพธ์";
    icon = <CheckMarkIcon />;
    buttonIcon = <IoMdSearch />;
  } else if (status == 2) {
    statustext = "ประมวลผลไม่สำเร็จ";
    buttontext = "ลองใหม่";
    icon = <CrossIcon />;
    buttonIcon = <TbReload />;
  }
  return (
    <div className="flex flex-row space-x-[48px] bg-white border-[2.5px] border-yellow-950 rounded-[32px] ">
      <div className="flex flex-row px-[24px] py-[24px] space-x-[48px] flex-grow ">
        <Image
          src={imageUrl}
          alt="picture"
          height={180}
          width={320}
          className="overflow-hidden"
        />
        <div className="flex flex-col space-y-[24px] px-[24px] py-[16px] rounded-[24px] border-[2.5px] border-yellow-950  items-center flex-grow">
          <h1 className=" font-bold text-xl flex-none text-amber-900">
            {statustext}
          </h1>
          {icon}
        </div>
      </div>
      <div className="w-[232px] flex flex-col justify-end px-[24px] py-[24px]">
        <ButtonK1
          IconLeft={buttonIcon}
          showIconLeft={true}
          text={buttontext}
          type="button"
        />
      </div>
    </div>
  );
}
