// models/Meal.ts
import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  calories: { type: Number, required: true },
});

export default mongoose.models.Meal || mongoose.model("Meal", MealSchema);
export interface IMeal {
  _id: string;
  title: string;
  description?: string;
  image?: string;
}
export interface MealType {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  
}
