import MealForm from '@/components/MealForm';

async function getMeal(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/meals/${id}`);
  return res.json();
}

export default async function EditMealPage({ params }: { params: { id: string } }) {
  const meal = await getMeal(params.id);

  return <MealForm meal={meal} />;
}
