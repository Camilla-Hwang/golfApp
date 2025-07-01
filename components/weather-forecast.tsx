"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface WeatherData {
  daily: {
    dt: number;
    temp: { min: number; max: number };
    weather: { id: number; icon: string; description: string }[];
  }[];
}

interface Props {
  lat: number;
  lon: number;
}

const getDayOfWeek = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

export default function WeatherForecast({ lat, lon }: Props) {
  const [forecast, setForecast] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      if (!apiKey) {
        setError("Weather API key is not configured.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch weather data.");
        }
        const data = await res.json();
        setForecast(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (loading) {
    return <p>Loading weather forecast...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-2xl font-semibold mb-4">7-Day Forecast</h2>
      <div className="grid grid-cols-4 md:grid-cols-7 gap-2 text-center">
        {forecast?.daily.slice(0, 7).map((day, index) => (
          <div key={index} className="p-2 border rounded-lg bg-background/50">
            <p className="font-semibold">{getDayOfWeek(day.dt)}</p>
            <Image
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              width={50}
              height={50}
              className="mx-auto"
            />
            <p className="text-sm">
              {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
