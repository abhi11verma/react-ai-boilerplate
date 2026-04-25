import { useCounterStore } from "@/store/counter.store";

export function Counter() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        React AI Boilerplate
      </h1>

      <p className="text-sm text-muted-foreground">
        Zustand + Tailwind + shadcn/ui ready
      </p>

      <span className="font-mono text-6xl font-semibold tabular-nums text-primary">
        {count}
      </span>

      <div className="flex items-center gap-3">
        <button
          onClick={decrement}
          className="rounded-md bg-secondary px-4 py-2 font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
        >
          −
        </button>
        <button
          onClick={increment}
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          +
        </button>
      </div>

      <button
        onClick={reset}
        className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
      >
        Reset
      </button>
    </div>
  );
}
