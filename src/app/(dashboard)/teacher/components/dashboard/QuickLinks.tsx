"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlusCircle, Trophy } from 'lucide-react';
import styles from '@/components/achievementPage/styles/achievement.module.scss';
import AchievementForm from '@/components/achievementPage/form/achievementForm';

export default function QuickLinks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button className="w-full" onClick={handleOpenModal}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add
        </Button>
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} >
              <AchievementForm onClose={handleCloseModal} />
            </div>
          </div>
        )}
        <Link href="/teacher/achievement">
          <Button variant="outline" className="w-full">
            <Trophy className="mr-2 h-4 w-4" /> View
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}


