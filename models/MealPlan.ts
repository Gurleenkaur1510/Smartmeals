// models/MealPlan.ts
import mongoose, { Schema, models, model } from 'mongoose';

const MealPlanSchema = new Schema({
  userId: {
    type: String, 
    required: true,
  },
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  title: { type: String, required: true },
  image: { type: String, required: true },
  calories: Number,
  description: String,
});

const MealPlan = models.MealPlan || model('MealPlan', MealPlanSchema);
export default MealPlan;
