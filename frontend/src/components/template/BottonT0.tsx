import Link from "next/link";
// DO NOT USE THIS YET
export default function ButtonT0({
  styleDisabled = "px-[48px] py-[6px] text-[32px] rounded-[16px] bg-blue-100 text-blue-400",
  styleDefault = "px-[48px] py-[6px] text-[32px] rounded-[16px]  bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-blue-50 ",
  text,
  url,
  isDisabled = false,
  hasOnClick = false,
  onClick,
}: Readonly<{
  styleDisabled?: string;
  styleDefault?: string;
  text: string;
  url: string;
  isDisabled?: boolean;
  hasOnClick?: boolean;
  onClick?: () => void;
}>) {
  if (isDisabled) {
    return <div className={styleDisabled}>{text}</div>;
  }
  if (hasOnClick) {
    return (
      <div className={styleDefault} onClick={onClick}>
        {text}
      </div>
    );
  }
  return (
    <Link href={url} className="">
      <div className={styleDefault}>{text}</div>
    </Link>
  );
}
