import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;

export type UserModel = mongoose.Document & {
    facebook_id: string;
    email: string;
    name: string;
};

export type CommentModel = mongoose.Document & {
    user: string,
    post: string,
    body: string,
};

export type CategoryModel = mongoose.Document & {
    title: string;
};

export type PostModel = mongoose.Document & {
    user: string,
    category: string,
    title: string,
    body: string,
    location: {
        type: string
        coordinates: number[] // [longitude, latitude]
    },
    address: string,
    city: string,
    state: string,
    zip: string,
    date_created: Date,
    comments: CommentModel[]
};

const UserSchema = new Schema({
    facebook_id: String,
    email: String,
    name: String,
});

const CommentSchema = new Schema({
    user: ObjectId,
    post: ObjectId,
    body: String,
});

const CategorySchema = new Schema({
    title: String,
});

const PostSchema = new Schema({
    user: ObjectId,
    category: ObjectId,
    title: String,
    body: String,
    location: {
        type: { type: String }, // "Point"
        coordinates: [] // [longitude, latitude]
    },
    address: String,
    city: String,
    state: String,
    zip: String,
    date_created: Date,
    comments: [CommentSchema]
});

PostSchema.index({ location: "2dsphere" });

var User = mongoose.model<UserModel>('User', UserSchema);
var Comment = mongoose.model<CommentModel>('Comment', CommentSchema);
var Category = mongoose.model<CategoryModel>('Category', CategorySchema);
var Post = mongoose.model<PostModel>('Post', PostSchema);

mongoose.connect('mongodb://localhost:27017/workstop', (err) => {
    if (err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Connected to the DB');
});

export { User, Comment, Category, Post };