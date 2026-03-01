import {Schema,model} from 'mongoose';
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
const foodModel=model.food|| model("food",foodShema);
export default foodModel;