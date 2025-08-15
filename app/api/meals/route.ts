// app/api/meals/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Meal from "@/models/Meal";

export async function GET() {
  try {
    await dbConnect();

    const meals = await Meal.find();

    return NextResponse.json(meals, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch meals:", error);
    return NextResponse.json({ message: "Failed to fetch meals" }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name, calories, description } = body;

    if (!name || !calories || !description) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const newMeal = new Meal({
      name,
      calories,
      description,
    });

    await newMeal.save();

    return NextResponse.json({ message: "Meal added successfully" }, { status: 201 });
  } catch (error) {
    console.error("POST /api/meals error:", error);
    return NextResponse.json({ message: "Failed to add meal" }, { status: 500 });
  }
}
