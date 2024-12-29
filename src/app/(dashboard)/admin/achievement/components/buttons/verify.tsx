import React, { useState } from 'react';
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';

interface VerifyProps {
  id: number;
  initialVerified: boolean | null;
}



const Verify: React.FC<VerifyProps> = ({ id, initialVerified }) => {
  const [verified, setVerified] = useState(initialVerified);
  

  const handleVerify = async () => {
    try {
      const response = await fetch(`/api/achievement/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, verify: !verified }),
      });

      if (response.ok) {
        setVerified(!verified);
      } else {
        console.error('Failed to update verification status');
      }
    } catch (error) {
      console.error('Error updating verification status:', error);
    }
  };

  return (
    <div onClick={handleVerify} className="cursor-pointer">
      {verified ? (
        <CheckCircle2Icon className="text-green-500" />
      ) : (
        <XCircleIcon className="text-red-500" />
      )}
    </div>
  );
};

export default Verify;