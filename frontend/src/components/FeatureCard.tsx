import Image from "next/image";
import Link from "next/link";

export default function FeatureCard({
  title,
  description,
  imageUrl,
  featureUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
  featureUrl: string;
}) {
  return (
    <div className="w-[384px] h-[452px] flex flex-col items-center px-[32px] py-[32px] space-y-[32px] rounded-[24px] border-[2.5px] border-orange-950 bg-white size-fit  ">
      <Image
        src={imageUrl}
        alt={title + "'s image"}
        width={320}
        height={180}
        className="object-fill w-[320px] h-[180px]"
      />

      <div className="flex flex-col px-[16px] py-[16px] space-y-[16px]  shrink">
        <Link href={featureUrl}>
          <h1 className="text-xl font-bold text-orange-600 shrink">{title}</h1>
        </Link>

        <h1 className="text-base text-orange-950 w-full shrink">
          {description}
        </h1>
      </div>
    </div>
  );
}
