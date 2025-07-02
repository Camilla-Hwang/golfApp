"use client";
import dynamic from "next/dynamic";
import { GolfCourse } from "./course-card";
import { LatLngBounds } from "leaflet";

const MapView = dynamic(() => import("./map-view"), { ssr: false });

export default function MapSection({
  courses,
  onBoundsChange,
  onUserMapInteraction,
}: {
  courses: GolfCourse[];
  onBoundsChange?: (bounds: LatLngBounds) => void;
  onUserMapInteraction?: () => void;
}) {
  return <MapView courses={courses} onBoundsChange={onBoundsChange} onUserMapInteraction={onUserMapInteraction} />;
}
