// src/components/ui/Progress.tsx

interface ProgressProps {
  value: number; // مقدار درصدی از 0 تا 100
  className?: string;
}

const Progress = ({ value, className }: ProgressProps) => {
  return (
    <div className={`w-full h-3 bg-gray-200 rounded-full overflow-hidden ${className}`}> 
      <div 
        className="h-full bg-green-500 rounded-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;