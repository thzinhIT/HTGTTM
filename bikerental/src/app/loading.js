export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  );
}
