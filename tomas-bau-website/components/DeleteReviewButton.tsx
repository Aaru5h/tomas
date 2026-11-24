'use client';

export default function DeleteReviewButton() {
  return <button type="submit" onClick={(event) => { if (!window.confirm('Möchten Sie Ihre Bewertung wirklich löschen?')) event.preventDefault(); }} className="font-semibold text-red-700 underline underline-offset-4">Meine Bewertung löschen</button>;
}
