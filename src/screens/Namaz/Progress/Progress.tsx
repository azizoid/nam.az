export type ProgressProps = {
  bar: number;
};

export const Progress = ({ bar }: ProgressProps) => (
  <div className="my-3 h-1 w-full bg-gray-200" role="progressbar">
    <div
      className={`h-1 ${bar > 75 ? 'bg-red-600' : 'bg-green-500'}`}
      style={{ width: `${bar}%` }}
    ></div>
  </div>
)
