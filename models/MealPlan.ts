import mongoose from 'mongoose';

const MealPlanSchema = new mongoose.Schema({
  userId: {
    type: String, // email as string
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

const MealPlan = mongoose.models.MealPlan || mongoose.model('MealPlan', MealPlanSchema);
export default MealPlan;
