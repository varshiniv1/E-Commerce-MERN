import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
});

const Brand = mongoose.model('Brand', brandSchema);

export { Brand };
