import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongoose_delete from "mongoose-delete";


const Schema = mongoose.Schema;

const Data = new Schema({
    idProduct: { type: String},
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

mongoose.plugin(slug);
Data.plugin(mongoose_delete, { overrideMethods: 'all' });

const Wishlist = mongoose.model("wishlist", Data);

export default Wishlist;