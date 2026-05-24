const values = [2, 4, 3, 5, 1, 0, 4, 5, 3, 4, 2, 1, 5, 5, 4, 3, 2, 0, 4, 3, 5, 4, 2, 3, 5, 1, 2, 4];

export function Heatmap() {
  return (
    <div className="grid grid-cols-7 gap-2">
      {values.map((value, index) => (
        <div
          key={`${value}-${index}`}
          className="aspect-square rounded-md border border-white/50 transition-transform hover:scale-110"
          style={{
            background: value === 0 ? "rgba(148,163,184,0.16)" : `rgba(45, 212, 191, ${0.18 + value * 0.13})`
          }}
          title={`${value} focused sessions`}
        />
      ))}
    </div>
  );
}
