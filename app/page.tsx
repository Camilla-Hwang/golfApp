import { createClient } from "@/lib/supabase/server";
import { GolfCourse } from "@/components/course-card";
import ClientOnlyCourseDirectory from "@/components/client-only-directory";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = await createClient();
  const country = searchParams.country || "Singapore";
  const state = searchParams.state;
  const search = searchParams.search;

  let query = supabase.from("golf_courses").select("*").order("name");

  if (country) {
    query = query.ilike("country", country as string);
  }

  if (country === 'Malaysia' && typeof state === 'string' && state.trim() !== '' && state !== 'All States') {
    query = query.eq('state', state);
  }

  if (search) {
    const searchString = `%${search as string}%`;
    query = query.or(`name.ilike.${searchString},state.ilike.${searchString}`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching courses:", error);
    return <p className="p-4 text-red-500">Error loading courses.</p>;
  }

  const courses: GolfCourse[] = data || [];

  return <ClientOnlyCourseDirectory courses={courses} />;
}
