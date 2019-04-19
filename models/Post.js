const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let PostSchema = new Schema(
    {
        text: 
        { type: String,
            required:true
        },
        title: {
            type:String,
            required:true
        },
        
        img: String,
        avatar: {
          type: String
        },
    
        author:{
            type: String,
          },
        authorId:{
          
            type: Schema.Types.ObjectId,
            ref: 'users'
          

        },
          date: {
            type: Date,
            default: Date.now
          }
    }
);

module.exports = Post = mongoose.model('post', PostSchema);
