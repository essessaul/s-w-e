import React from "react";
import { Link } from "react-router-dom";
import { Bath, BedDouble, MapPin, Star, Users } from "lucide-react";
import { Badge, Button, Card } from "../common/ui";

export default function PropertyCard({ property, mode = "rental" }) {
  const detailHref = mode === "sale" ? `/for-sale/${property.slug}` : `/property/${property.slug}`;

  return (
    <Card>
      <div className="property-card">
        <Link to={detailHref} style={{ display: "block" }}>
          <img src={property.image} alt={property.name} />
        </Link>

        <div className="meta-row" style={{ marginTop: 16, justifyContent: "space-between", flexWrap: "wrap" }}>
          <div className="meta-row" style={{ gap: ".5rem", flexWrap: "wrap" }}>
            <Badge>{property.category}</Badge>
            <Badge variant="outline">{mode === "sale" ? "For Sale" : property.status}</Badge>
            {property.vip ? <Badge variant="outline">VIP</Badge> : null}
          </div>
          {mode !== "sale" ? (
            <div className="inline-actions muted"><Star size={15} /> {property.rating}</div>
          ) : null}
        </div>

        <Link to={detailHref}><h3 style={{ marginTop: 16, marginBottom: 6, fontSize: "1.35rem" }}>{property.name}</h3></Link>
        <Link to={detailHref}><div className="inline-actions muted"><MapPin size={16} /> {property.location}</div></Link>
        <Link to={detailHref}><p className="muted" style={{ lineHeight: 1.7 }}>{property.description}</p></Link>

        {mode !== "sale" ? (
          <div className="metrics-grid" style={{ marginTop: 16 }}>
            <Link to={detailHref} className="metric-box"><BedDouble size={16} /><div style={{ fontWeight: 700 }}>{property.bedrooms} Beds</div></Link>
            <Link to={detailHref} className="metric-box"><Bath size={16} /><div style={{ fontWeight: 700 }}>{property.bathrooms} Baths</div></Link>
            <Link to={detailHref} className="metric-box"><Users size={16} /><div style={{ fontWeight: 700 }}>{property.guests} Guests</div></Link>
            <Link to={detailHref} className="metric-box"><Star size={16} /><div style={{ fontWeight: 700 }}>{property.rating}</div></Link>
          </div>
        ) : null}

        <div className="price-row" style={{ marginTop: 20 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900 }}>{mode === "sale" ? property.price : `$${property.rate}`}</div>
            <div className="muted" style={{ fontSize: 12 }}>{mode === "sale" ? "asking price" : "per night"}</div>
          </div>
          <div className="header-actions">
            <Link to={detailHref}><Button variant="light">More Details</Button></Link>
            {mode !== "sale" ? <Link to={`/booking/${property.slug}`}><Button>Reserve</Button></Link> : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
