"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, LatLngBounds } from "leaflet";
import { type GolfCourse } from "@/components/course-card";
import { useMemo, useEffect, useRef } from "react";
import Link from "next/link";

// Custom red dot icon
const redIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// This component handles auto-fitting the map to markers when results change
function FitBoundsController({ courses }: { courses: GolfCourse[] }) {
  const map = useMap();
  useEffect(() => {
    const markersWithCoords = courses.filter(c => c.latitude && c.longitude);
    if (markersWithCoords.length > 0) {
      const bounds = new L.LatLngBounds(markersWithCoords.map(c => [c.latitude as number, c.longitude as number]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [courses, map]);
  return null;
}

// This component reports map movements back to the parent
function MapEvents({ onBoundsChange, onUserMapInteraction }: { onBoundsChange: (bounds: LatLngBounds) => void, onUserMapInteraction?: () => void }) {
  const hasUserInteracted = useRef(false);
  const map = useMapEvents({
    dragstart: () => {
      hasUserInteracted.current = true;
      if (onUserMapInteraction) onUserMapInteraction();
    },
    zoomstart: () => {
      hasUserInteracted.current = true;
      if (onUserMapInteraction) onUserMapInteraction();
    },
    moveend: () => {
      if (hasUserInteracted.current) {
        onBoundsChange(map.getBounds());
      }
    },
    zoomend: () => {
      if (hasUserInteracted.current) {
        onBoundsChange(map.getBounds());
      }
    },
  });
  return null;
}

interface Props {
  courses: GolfCourse[];
  onBoundsChange?: (bounds: LatLngBounds) => void;
  onUserMapInteraction?: () => void;
}

export default function MapView({ courses, onBoundsChange, onUserMapInteraction }: Props) {
  const center: LatLngExpression = [1.35, 103.82]; // Singapore rough center
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const markers = useMemo(() => {
    return courses.filter((c) => !!c.latitude && !!c.longitude);
  }, [courses]);

  if (!mapboxToken) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <p className="text-red-500 text-center p-4">
          Mapbox access token is not configured. Please set<br />
          <code className="bg-red-100 p-1 rounded">NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN</code> in your environment.
        </p>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`}
      />
      {markers.map((course) => (
        <Marker
          key={course.id}
          position={[course.latitude as number, course.longitude as number]}
          icon={redIcon}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold">{course.name}</h3>
              <p className="text-muted-foreground">{course.state}</p>
              <Link href={`/course/${course.id}`} className="text-primary hover:underline mt-1 block">
                View details &rarr;
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
      <FitBoundsController courses={courses} />
      {onBoundsChange && <MapEvents onBoundsChange={onBoundsChange} onUserMapInteraction={onUserMapInteraction} />}
    </MapContainer>
  );
}
