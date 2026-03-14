import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { rentalListings } from "../data/mockData";
import PropertyCard from "../components/listings/PropertyCard";
import { Button, Badge } from "../components/common/ui";

function HomeSearch() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    if (form.get("query")) params.set("q", form.get("query"));
    if (form.get("checkIn")) params.set("check_in", form.get("checkIn"));
    if (form.get("checkOut")) params.set("check_out", form.get("checkOut"));
    if (form.get("guests")) params.set("guests", form.get("guests"));
    navigate(`/listings?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar-box hero-search-animate" style={{ marginTop: "1.5rem", maxWidth: 780 }}>
      <div className="search-grid">
        <input name="query" placeholder="Destination or Property ID" />
        <input name="checkIn" type="date" />
        <input name="checkOut" type="date" />
        <Button type="submit">Search</Button>
      </div>
      <div className="cta-row">
        <Link to="/listings"><Button type="button">View Rentals</Button></Link>
        <Link to="/for-sale"><Button type="button">Properties For Sale</Button></Link>
        <input
          name="guests"
          type="number"
          min="1"
          defaultValue="2"
          placeholder="Guests"
          style={{ width: 160 }}
        />
      </div>
    </form>
  );
}

export default function HomePage() {
  const vipListings = rentalListings.filter((item) => item.vip);
  const otherListings = rentalListings.filter((item) => !item.vip);

  return (
    <>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container">
          <div className="mockup-hero">
            <div className="mockup-overlay" />
            <div className="mockup-content">
              <div className="glass-panel" style={{ borderRadius: 28, padding: "2rem" }}>
                <Badge>Luxury Beachfront Living</Badge>
                <motion.h1
                  className="page-title"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  style={{ maxWidth: 580 }}
                >
                  Rent or Own Your Dream Home in Playa Escondida
                </motion.h1>

                <p style={{ fontSize: 1.18, lineHeight: 1.8, maxWidth: 580, marginBottom: 0 }}>
                  Luxury vacation rentals and properties for sale in a tropical paradise.
                  Search by dates and guests to find the right stay faster.
                </p>

                <HomeSearch />

                <div className="hero-note">
                  Direct sales from the promoter · Best attention and best price
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section feature-strip">
        <div className="container center-intro">
          <div className="section-heading" style={{ margin: "0 auto" }}>
            <h2 style={{ fontSize: "2rem", margin: 0 }}>Curated beachfront experiences and ownership opportunities</h2>
            <div className="luxury-divider" style={{ margin: ".9rem auto 0 auto" }} />
          </div>
          <p className="muted" style={{ lineHeight: 1.9, marginTop: "1rem" }}>
            Refined luxury presentation with stronger visual hierarchy, elevated search UX, and premium featured inventory.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-heading">
            <div className="muted" style={{ letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 800, fontSize: 13 }}>
              VIP Listings
            </div>
            <h2 style={{ fontSize: "2rem", margin: ".5rem 0 0 0" }}>Featured high-end vacation rentals</h2>
            <div className="luxury-divider" />
          </div>
          <div className="vip-carousel">
            {vipListings.map((item) => (
              <PropertyCard key={item.id} property={item} mode="rental" />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-heading">
            <div className="muted" style={{ letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 800, fontSize: 13 }}>
              Other Listings
            </div>
            <h2 style={{ fontSize: "2rem", margin: ".5rem 0 0 0" }}>More vacation rental options</h2>
            <div className="luxury-divider" />
          </div>
          <div className="module-grid">
            {otherListings.map((item) => (
              <PropertyCard key={item.id} property={item} mode="rental" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
