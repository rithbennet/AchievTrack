// components/QuickActionCard.tsx
import React from 'react';

interface QuickActionCardProps {
  title: string;
  onClick: () => void;
}

export default function QuickActionCard({ title, onClick }: QuickActionCardProps) {
  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <button className="btn btn-primary" onClick={onClick}>
            Go
          </button>
        </div>
      </div>
    </div>
  );
}
