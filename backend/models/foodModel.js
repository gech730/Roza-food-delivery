import mongoose, { Schema, model } from 'mongoose';

const foodSchema = new Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  image:       { type: String, required: true },
  category:    { type: String, required: true },
});

// Index for category filtering and name search
foodSchema.index({ category: 1 });
foodSchema.index({ name: 'text' });

const food_list = mongoose.models.food_list || model('food_list', foodSchema);
export default food_list;
