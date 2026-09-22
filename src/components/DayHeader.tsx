import React from "react";

interface DayHeaderProps {
  dayNumber: number;
  city: string;
  routeTitle: string;
  routeSubtitle: string;
}

export const DayHeader: React.FC<DayHeaderProps> = ({
  dayNumber,
  city,
  routeTitle,
  routeSubtitle,
}) => {
  return (
    <div className="day-header-block">
      <p className="day-header-label">DAY {dayNumber}</p>
      <h2 className="day-header-city">{city.toUpperCase()}</h2>
      <h3 className="day-header-route">{routeTitle}</h3>
      <p className="day-header-sub">{routeSubtitle}</p>
    </div>
  );
};
