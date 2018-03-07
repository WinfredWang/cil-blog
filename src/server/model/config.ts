import * as mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/blog');
const con = mongoose.connection;

con.on('error', (err) => {
    console.error("Failed to connect mongodb:blog");
    console.error(err);
});

con.once('open', () => {
    console.log('connected to mongodb:blog');
})
export { mongoose }
