import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import WeatherForecast from "@/components/weather-forecast";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("golf_courses")
    .select("*")
    .eq("id", id)
    .single();

  if (!course) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {course.photo_url && (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={course.photo_url}
              alt={course.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2">{course.name}</h1>
        <p className="text-lg text-muted-foreground mb-6">
          {course.state ? `${course.state}, ${course.country}` : course.country}
        </p>

        <div className="prose max-w-none">
          {course.description ? (
            <p>{course.description}</p>
          ) : (
            <p>No description available.</p>
          )}
        </div>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
          <ul className="space-y-2">
            {course.holes && <li><strong>Holes:</strong> {course.holes}</li>}
            {course.price && <li><strong>Price:</strong> {course.price}</li>}
            {course.website && (
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href={course.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  {course.website}
                </a>
              </li>
            )}
            {course.email && <li><strong>Email:</strong> {course.email}</li>}
            {course.whatsapp && <li><strong>WhatsApp:</strong> {course.whatsapp}</li>}
          </ul>
        </div>

        {course.latitude && course.longitude && (
          <WeatherForecast lat={course.latitude} lon={course.longitude} />
        )}
      </div>
    </main>
  );
}
