import { useSnapshot } from 'valtio';
import { state } from '../state';

export const Preview = () => {
  const { form, previewData } = useSnapshot(state);

  if (!form || !previewData) return null;

  const { width, height } = form;
  const margin = 10;
  const paperViewBox = `0 0 ${width + margin * 2} ${height + margin * 2}`;
  const transform = `translate(${margin}, ${margin})`;

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl">Preview</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={paperViewBox}
        className="bg-zinc-200 fill-none max-h-180"
        strokeLinecap="round"
        strokeWidth="1"
      >
        <rect
          x={margin}
          y={margin}
          width={width}
          height={height}
          className="stroke-zinc-500"
        />
        <path
          d={previewData}
          className="stroke-rose-400"
          transform={transform}
          strokeLinejoin="round"
        />
        <path
          d={previewData}
          className="stroke-rose-400/25"
          strokeWidth={form.bit_diameter}
          transform={transform}
          strokeLinejoin="round"
        />
        <path
          d={`M-5,${form.height} L5,${form.height} M0,${form.height - 5} L0,${
            form.height + 5
          }`}
          className="stroke-emerald-400"
          transform={transform}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
