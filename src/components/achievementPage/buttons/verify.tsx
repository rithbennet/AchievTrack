import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import { getSession } from 'next-auth/react';

interface VerifyProps {
  id: number;
  initialVerified: boolean | null;
}



const Verify: React.FC<VerifyProps> = ({ id, initialVerified }) => {
  const [verified, setVerified] = useState(initialVerified);
  const [verifier, setVerifier] = useState<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setVerifier(Number(session?.user?.id));
    };
    fetchSession();
  }, []);

  const handleVerify = async () => {
    try {
      const response = await fetch(`/api/achievement/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, verify: !verified, verifier: verifier }),
      });
      setOpen(false);
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
    <div>
      <div className="cursor-pointer">
        {verified ? (
          <CheckCircle2Icon className="text-green-500" />
        ) : (
          <XCircleIcon className="text-red-500" onClick={handleDialogOpen} />
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="hidden">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Confirm Verification</DialogTitle>
          <DialogDescription>
            Are you sure you want to verify this achievement?
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="default" onClick={handleVerify}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Verify;