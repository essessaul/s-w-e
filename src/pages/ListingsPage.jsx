import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/listings/PropertyCard";
import { getRentalListings } from "../services/propertyService";
import { isListingAvailable } from "../services/availabilityService";

export default function ListingsPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [checkIn, setCheckIn] = useState(searchParams.get("check_in") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("check_out") || "");
  const [guests, setGuests] = useState(searchParams.get("guests") || "");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getRentalListings().then(setProperties);
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const textMatch = [p.name, p.category, p.location, ...(p.amenities || [])]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());

      const guestsMatch = guests ? p.guests >= Number(guests) : true;
      const availabilityMatch = isListingAvailable(p, checkIn, checkOut);

      return textMatch && guestsMatch && availabilityMatch;
    });
  }, [query, properties, guests, checkIn, checkOut]);

  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <div className="muted" style={{ letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 800, fontSize: 13 }}>
            Vacation Rentals
          </div>
          <h1 className="page-title" style={{ color: "#2f3d6b", marginBottom: ".5rem" }}>Browse available vacation rentals</h1>
          <div className="luxury-divider" />
          <p className="muted" style={{ maxWidth: 760, lineHeight: 1.8, marginTop: "1rem" }}>
            Filter by dates, guest count, and keywords to find available listings faster.
          </p>
        </div>

        <div className="card" style={{ padding: "1.2rem", marginBottom: "1.5rem" }}>
          <div className="grid" style={{ gap: "1rem" }}>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#6b8f88" }} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search listings" style={{ paddingLeft: 42 }} />
            </div>
            <div className="two-col" style={{ gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </div>
            <div>
              <input type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="Guests" />
            </div>
          </div>
        </div>

        <div className="module-grid">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} mode="rental" />
          ))}
        </div>
      </div>
    </section>
  );
}
