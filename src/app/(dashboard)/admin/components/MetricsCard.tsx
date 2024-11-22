// components/MetricsCard.tsx
import React from 'react';

interface MetricsCardProps {
  title: string;
  value: number;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value }) => {
  return (
    <div className="col-md-3">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="display-4">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
