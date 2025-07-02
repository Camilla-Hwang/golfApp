'use client';

import { useState, useEffect, useRef } from 'react';
import { LatLngBounds } from 'leaflet';
import CourseCard, { GolfCourse } from './course-card';
import MapSection from './map-section';
import { useSearchParams, useRouter } from 'next/navigation';

interface Props {
  courses: GolfCourse[];
}

export default function CourseDirectory({ courses }: Props) {
  const searchParams = useSearchParams();
  const country = searchParams.get('country') || 'Singapore';

  const [visibleCourses, setVisibleCourses] = useState<GolfCourse[]>(courses);
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [isMapFiltering, setIsMapFiltering] = useState(false);
  const hasUserInteracted = useRef(false);

  useEffect(() => {
    setIsMapFiltering(false);
    setBounds(null);
    hasUserInteracted.current = false;
    setVisibleCourses(courses);
  }, [courses]);

  useEffect(() => {
    if (
      isMapFiltering &&
      bounds &&
      hasUserInteracted.current &&
      courses.length > 0
    ) {
      const filtered = courses.filter(course => {
        if (course.latitude && course.longitude) {
          return bounds.contains([course.latitude, course.longitude]);
        }
        return false;
      });
      setVisibleCourses(filtered);
    }
  }, [bounds, courses, isMapFiltering]);

  if (!courses) {
    return <div className="w-full h-full flex items-center justify-center"><p>Loading courses...</p></div>;
  }

  const handleUserMapInteraction = () => {
    hasUserInteracted.current = true;
  };

  const handleBoundsChange = (newBounds: LatLngBounds) => {
    if (!isMapFiltering && hasUserInteracted.current) {
      setIsMapFiltering(true);
    }
    setBounds(newBounds);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row px-0 md:pl-8 pr-0 md:gap-8">
      <section className="order-1 md:order-2 md:basis-[38.5%] w-full h-[60vh] md:h-auto md:max-h-screen md:overflow-y-auto fixed top-0 left-0 right-0 z-0 md:relative md:z-auto">
        <div className="w-full h-full">
          <MapSection courses={courses} onBoundsChange={handleBoundsChange} onUserMapInteraction={handleUserMapInteraction} />
        </div>
      </section>
      <aside className="order-2 md:order-1 md:basis-[61.5%] w-full overflow-y-auto p-0 bg-background relative z-10 md:z-auto mt-[60vh] md:mt-0 px-4 pt-8 md:px-0 md:pt-0 rounded-t-xl md:rounded-none">
        <div className="mt-8 mb-8 p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-center">
          <p className="font-semibold">Results in this map area &middot; {visibleCourses.length} courses shown</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {visibleCourses.length > 0 ? (
            visibleCourses.map((c: GolfCourse) => (
              <CourseCard key={c.id} course={c} country={country as string} />
            ))
          ) : isMapFiltering ? (
            <p>No courses found in this map area.</p>
          ) : courses.length === 0 ? (
            <p>No courses found for your search/filter.</p>
          ) : null}
        </div>
      </aside>
    </main>
  );
}
