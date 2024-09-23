import { Suspense } from 'react';
import ChangeColorForm from './ChangeColorForm';

export default function ChangeColorPage() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <ChangeColorForm />
    </Suspense>
  );
}