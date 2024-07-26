import "../styles/components/Forecast.css";

export function Forecast({ data }) {
  return (
    <div className={`forecast`}>
      <h1 className="title">Day's Forecast</h1>
      <div className="forecast-list">
        {data.map((hour) => (
          <div>
            <img src={hour.weatherCode.image} alt="zdgf" />
          </div>
        ))}
      </div>
    </div>
  );
}
