import { LandingRoadMapSection } from "@/components/modules/landing/road-map";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Road Map" };

const RoadMapPage = () => {
  return (
    <main>
      <LandingRoadMapSection />
    </main>
  );
};

export default RoadMapPage;
