import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';

import { deleteStorageData, state, updateData } from '../state';
import { Preview } from './Preview';

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

    if (!state.gcode || !state.preview) {
      updateData(state.form);
    }
  }, [isReady]);

  return (
    <div className="flex gap-8">
      <form
        className="flex flex-col gap-4 w-100 shrink-0"
        onSubmit={handleSubmit(updateData)}
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
        <div className="flex flex-col gap-1">
          <label>Start GCode</label>
          <textarea
            className="w-full border border-zinc-400 p-1 rounded min-h-48 font-mono"
            autoCorrect="false"
            {...register('start_gcode')}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>End GCode</label>
          <textarea
            className="w-full border border-zinc-400 p-1 rounded min-h-48 font-mono"
            autoCorrect="false"
            {...register('end_gcode')}
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
            <div className="text-2xl">GCode</div>
            <textarea
              value={gcode}
              readOnly
              className="w-full border border-zinc-400 p-1 rounded min-h-80 font-mono"
            />
            <div className="flex justify-between items-center">
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                  gcode
                )}`}
                download="surfacing.nc"
                className="text-sky-600 font-bold btn-default"
              >
                Download
              </a>
              <button
                className="btn-default rounded border border-zinc-400 px-2 py-1"
                onClick={deleteStorageData}
              >
                Delete Storage Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
