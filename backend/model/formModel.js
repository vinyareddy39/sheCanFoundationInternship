import {Schema,model} from 'mongoose'
const fromSchema = new schema({

    name: {
        type:String,
        required:[true,"the name is imp"]
    },email:{
        type:String,
        required:[true,"the email is imp"]
    },
    message:{
        type:String,
        required:[true,"the message is imp"],
        minLength:[6," the min length should be 6 "]
    }

});
export const fromModel = model("form",fromSchema)