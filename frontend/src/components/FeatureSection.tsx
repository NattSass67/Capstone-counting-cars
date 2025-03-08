import FeatureCard from "./FeatureCard";
import {
  StraightLineFeature,
  IntersectionsFeature,
} from "@/constant/constValue";

export default function FeatureSection() {
  return (
    <div className="w-full flex flex-col space-y-[32px]">
      <h1 className="text-3xl font-bold text-orange-950">Features</h1>
      <div className="flex flex-row w-full justify-center space-x-[56px]">
        <FeatureCard
          title="Striaght Line Counting"
          description={StraightLineFeature}
          featureUrl="newjob/step1?type=straight"
          imageUrl="/img/straightRoad.jpg"
        />
        <FeatureCard
          title="Intersection Counting"
          description={IntersectionsFeature}
          featureUrl="newjob/step1?type=intersection"
          imageUrl="/img/intersection.jpg"
        />
      </div>
    </div>
  );
}
