import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Meal from "@/models/Meal";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = context.params;

    const meal = await Meal.findById(id);

    if (!meal) {
      return NextResponse.json({ message: "Meal not found" }, { status: 404 });
    }

    return NextResponse.json(meal);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching meal" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = context.params;
    const body = await req.json();

    const updatedMeal = await Meal.findByIdAndUpdate(id, body, { new: true });

    if (!updatedMeal) {
      return NextResponse.json({ message: "Meal not found" }, { status: 404 });
    }

    return NextResponse.json(updatedMeal);
  } catch (error) {
    return NextResponse.json({ message: "Error updating meal" }, { status: 500 });
  }
}
export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = context.params;

    const deletedMeal = await Meal.findByIdAndDelete(id);

    if (!deletedMeal) {
      return NextResponse.json({ message: "Meal not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Meal deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: "Failed to delete meal" }, { status: 500 });
  }
}
