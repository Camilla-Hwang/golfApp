import MapSection from "@/components/map-section";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import CourseCard, { GolfCourse } from "@/components/course-card";



export default async function Home() {
  const supabase = await createClient();
  const { data: courses = [] } = await supabase
    .from("golf_courses")
    .select("*")
    .order("country")
    .order("name");

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* list panel */}
      <aside className="md:w-1/3 w-full max-h-screen overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((c: GolfCourse) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </aside>

      {/* map panel */}
      <section className="flex-1 h-[60vh] md:h-auto">
        <Suspense fallback={<p className="p-4">Loading map…</p>}>
          <MapSection courses={courses} />
        </Suspense>
      </section>
    </main>
  );
}
