"use client";
import Image from "next/image";
import Link from "next/link";

export interface GolfCourse {
  id: string;
  name: string;
  country: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  holes: number | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  description: string | null;
  photo_url: string | null;
  price: string | null;
}

interface Props {
  course: GolfCourse;
}

export default function CourseCard({ course }: Props) {
  return (
    <Link href={`/course/${course.id}`} className="block group">
      <div className="w-full aspect-square relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        {course.photo_url ? (
          <Image
            src={course.photo_url}
            alt={course.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No image</p>
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className="font-semibold text-base truncate">{course.name}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {course.city}, {course.country}
        </p>
        {course.price && (
          <p className="text-sm font-medium mt-1">{course.price}</p>
        )}
      </div>
    </Link>
  );
}
