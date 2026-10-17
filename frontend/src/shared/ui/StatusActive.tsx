export const statusColors = {
  'true': 'bg-lime text-blue-700',
  'false': 'bg-gray-100 text-gray-700',
};

export default function StatusActive({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`h-2.5 w-2.5 rounded-full ${isActive ? statusColors["true"] : statusColors["false"]
        }`}
    />
  )
}