import React from "react";
import { Building2, Navigation, Copy, ExternalLink, MapPin, Train } from "lucide-react";
import type { HotelInfo } from "../types/itinerary";
import { copyForDriverOrDiDi } from "../utils/didi";

interface HotelCardProps {
  hotel: HotelInfo;
  onShowToast: (message: string) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onShowToast }) => {
  const handleCopyHotel = async () => {
    const success = await copyForDriverOrDiDi(
      hotel.chineseName,
      hotel.chineseAddress,
      (text) => {
        onShowToast(`Copied hotel for driver: "${text}"`);
      }
    );
    if (!success) {
      onShowToast("Could not copy hotel information");
    }
  };

  return (
    <section className="hotel-card" aria-label="Base Hotel Information">
      <div className="hotel-card-header">
        <div className="hotel-tag-badge">
          <Building2 size={13} className="hotel-icon" />
          <span>BASE HOTEL · SHANGHAI</span>
        </div>
        {hotel.tier && <span className="hotel-tier-pill">{hotel.tier}</span>}
      </div>

      <div className="hotel-main-body">
        <div className="hotel-titles">
          <h4 className="hotel-name-en">{hotel.name}</h4>
          <span className="hotel-name-zh">{hotel.chineseName}</span>
        </div>

        <div className="hotel-details-list">
          <div className="hotel-detail-row">
            <MapPin size={13} className="detail-icon" />
            <div className="detail-content">
              <span className="detail-primary">{hotel.address}</span>
              <span className="detail-secondary">{hotel.chineseAddress}</span>
            </div>
          </div>

          <div className="hotel-detail-row">
            <Train size={13} className="detail-icon" />
            <div className="detail-content">
              <span className="detail-primary">{hotel.subwayAccess}</span>
              <span className="detail-secondary">Line 10 connects directly to Yuyuan (Yu Garden) & Hongqiao</span>
            </div>
          </div>
        </div>

        <div className="hotel-actions-row">
          <a
            href={hotel.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hotel-btn hotel-map-btn"
            title="Open route in Amap (Gaode)"
          >
            <Navigation size={13} className="nav-arrow" />
            <span>Amap Route</span>
            <ExternalLink size={12} className="ext-icon" />
          </a>

          <button
            type="button"
            className="hotel-btn hotel-copy-btn no-print"
            onClick={handleCopyHotel}
            title="Copy Chinese name and address for taxi or DiDi driver"
          >
            <Copy size={13} />
            <span>Copy for Driver / DiDi</span>
          </button>
        </div>
      </div>
    </section>
  );
};
