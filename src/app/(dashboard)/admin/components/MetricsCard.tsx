// components/MetricsCard.tsx
import React from 'react';

interface MetricsCardProps {
  title: string;
  value: number;
}

export default function MetricsCard({ title, value }: MetricsCardProps) {
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
}
