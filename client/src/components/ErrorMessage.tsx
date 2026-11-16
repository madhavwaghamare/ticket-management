// Inline validation error for a form field: {errors.name && <ErrorMessage message={errors.name.message} />}
export default function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}
