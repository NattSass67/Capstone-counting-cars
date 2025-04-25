// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppManual } from "@/constant/constValue";

export default function HowToUsePage() {
  return (
    <div className="px-4 py-4 flex flex-col space-y-6">
      <h1 className="text-2xl font bold">How to use this app</h1>
      <p>{AppManual}</p>
    </div>
  );
}
