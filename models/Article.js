 var mongoose = require ('mongoose');
 var Schema = mongoose.Schema;
 var ArticlesSchema = new Schema ({
     title: {
         type: String,
         required: true
     },
     link: {
         type: String,
         required: true
     },
     note: {
        type: String,
     },
     image: {
         type: String,
     },
     summary: {
         type: String
     }
 });

 var Articles = mongoose.model('Articles', ArticlesSchema);

 module.exports = Articles;