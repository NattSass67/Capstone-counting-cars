import Link from "next/link";

export default function Icon({
  children,
  className,
  clickable = false,
  url = "",
}: {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  url?: string;
}) {
  if (clickable) {
    <div
      className={
        className + " flex items-center justify-center rounded-[900px]"
      }
    >
      {children}
    </div>;
  }
  return (
    <Link href={url}>
      <div
        className={
          className + " flex items-center justify-center rounded-[900px]"
        }
      >
        {children}
      </div>
    </Link>
  );
}
