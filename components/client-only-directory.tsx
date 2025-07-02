'use client';

import dynamic from 'next/dynamic';
import { GolfCourse } from './course-card';
import React, { Suspense } from 'react';

const CourseDirectory = dynamic(() => import('./course-directory'), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center"><p>Loading Map...</p></div>
});

interface Props {
  courses: GolfCourse[];
}

const SkeletonCourseGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md h-64 w-full">
        <div className="h-2/3 w-full bg-gray-300 dark:bg-gray-600 rounded-t-lg" />
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-2" />
        </div>
      </div>
    ))}
  </div>
);

export default function ClientOnlyCourseDirectory({ courses }: Props) {
  return (
    <Suspense fallback={<SkeletonCourseGrid />}>
      <CourseDirectory courses={courses} />
    </Suspense>
  );
}
