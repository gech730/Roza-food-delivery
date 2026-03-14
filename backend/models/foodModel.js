import moongoose,{Schema,model}  from  'mongoose';
const foodShema= new Schema({
    name:{
        type:String,required:true
    },
    description:{
        type:String,required:true
    },
    price:{type:Number,required:true},
    image:{type:String,required:true
    },
    category:{type:String,required:true}
});
const food_list=moongoose.models.food|| model("food_list",foodShema);
export default food_list;