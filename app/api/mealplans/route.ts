import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { dbConnect } from '@/lib/mongodb';
import MealPlan from '@/models/MealPlan';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const plans = await MealPlan.find({ userId: session.user.email });
    return NextResponse.json({ plans });
  } catch (error) {
    console.error('[MEALPLAN_GET_ERROR]', error);
    return NextResponse.json({ message: 'Failed to load meal plans' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { day, title, image, calories, description } = await req.json();
    if (!day || !title || !image) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    const updated = await MealPlan.findOneAndUpdate(
      { userId: session.user.email, day },
      {
        userId: session.user.email,
        day,
        title,
        image,
        calories,
        description,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[MEALPLAN_POST_ERROR]', error);
    return NextResponse.json({ message: 'Failed to save meal plan' }, { status: 500 });
  }
}
