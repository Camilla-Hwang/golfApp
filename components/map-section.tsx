"use client";
import dynamic from "next/dynamic";
import { GolfCourse } from "./course-card";

const MapView = dynamic(() => import("./map-view"), { ssr: false });

export default function MapSection({ courses }: { courses: GolfCourse[] }) {
  return <MapView courses={courses} />;
}
