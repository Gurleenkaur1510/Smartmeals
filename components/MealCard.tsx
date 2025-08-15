// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MealCard({ meal }:{meal:any}) {
  return (
    <div className="rounded-2xl shadow p-4">
      <h3 className="mt-2 font-semibold">{meal.title}</h3>
      <p className="text-sm opacity-70 capitalize">{meal.mealType}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {meal.tags?.map((t:string)=> <span key={t} className="text-xs border px-2 py-0.5 rounded-full">{t}</span>)}
      </div>
    </div>
  );
}
