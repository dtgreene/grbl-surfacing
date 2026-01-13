import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';

import { state } from '../state';
import { Preview } from './Preview';
import { createGCode, createPreviewPath } from '../utils';

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { isReady },
    reset,
  } = useForm();
  const { gcode } = useSnapshot(state);

  useEffect(() => {
    if (!isReady) return;

    reset(state.form);
  }, [isReady]);

  const onSubmit = (data) => {
    state.form = data;
    state.gcode = createGCode();
    state.previewData = createPreviewPath();
  };

  return (
    <div className="flex gap-8">
      <form
        className="flex flex-col gap-4 w-64 shrink-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <label>Width</label>
          <input
            type="number"
            min="1"
            className="border border-zinc-400 rounded px-1 w-24"
            required
            {...register('width', { valueAsNumber: true })}
          />
        </div>
        <div className="flex justify-between">
          <label>Height</label>
          <input
            type="number"
            min="1"
            className="border border-zinc-400 rounded px-1 w-24"
            required
            {...register('height', { valueAsNumber: true })}
          />
        </div>
        <div className="flex justify-between">
          <label>Units</label>
          <select
            className="border border-zinc-400 rounded px-1 w-24"
            required
            {...register('units')}
          >
            <option value="mm">mm</option>
            <option value="in">in</option>
          </select>
        </div>
        <div className="flex justify-between">
          <label>Bit Diameter</label>
          <input
            type="number"
            className="border border-zinc-400 rounded px-1 w-24"
            required
            min="0.01"
            step="0.01"
            {...register('bit_diameter', { valueAsNumber: true })}
          />
        </div>
        <div className="flex justify-between">
          <label>Stepover %</label>
          <input
            type="number"
            className="border border-zinc-400 rounded px-1 w-24"
            required
            min="0.01"
            max="1"
            step="0.01"
            {...register('step_over', { valueAsNumber: true })}
          />
        </div>
        <div className="flex justify-between">
          <label>Feed Rate</label>
          <input
            type="number"
            min="1"
            className="border border-zinc-400 rounded px-1 w-24"
            required
            {...register('feed_rate', { valueAsNumber: true })}
          />
        </div>
        <div className="flex justify-between">
          <label>RPM</label>
          <input
            type="number"
            min="1"
            className="border border-zinc-400 rounded px-1 w-24"
            required
            {...register('rpm', { valueAsNumber: true })}
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="btn-default rounded px-4 py-2 bg-sky-600 text-white w-full"
          >
            Calculate
          </button>
        </div>
      </form>
      <div className="flex-1 flex flex-col gap-8">
        <Preview />
        {gcode && (
          <div className="flex flex-col gap-4">
            <textarea
              value={gcode}
              readOnly
              className="w-full border border-zinc-400 p-4 rounded min-h-80"
            />
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                gcode
              )}`}
              download="surfacing.nc"
            >
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
