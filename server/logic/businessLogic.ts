import { User, Post, Category } from './schema';
import getGpsCoords from '../utils/location';

export interface QuerySettings {
    categories: string[],
    distance: number;
    location: {city: string, state:string};
    coords: { lat: number, long: number };
}

export interface QuerySettings {
    categories: string[],
    distance: number;
    location: {city: string, state:string};
    coords: { lat: number, long: number };
}

export class BusinessLogic {

    populateDb() {
        var user = new User({name: "Aaron Vanderwielen", email: "AaronVander@live.com" });
        user.save();

        var categories = [
            "Construction",
            "Landscaping", 
            "Appliances",
            "Creative"
        ];

        categories.forEach((c) => {
            var cat = new Category({title: c});
            cat.save();
        });

        var work = [
            {
                Title: "Fix my gate",
                Description: "Post cracked at base and needs to be removed and replaced.",
                Category: "Construction",
                Address: "6460 NE Prospect St",
                City: "Suquamish",
                State: "WA",
                Zip: "98392",
                DateCreated: new Date()
            },
            {
                Title: "Need house build",
                Description: "2600sqft house needs to be build in kingston wa",
                Category: "Construction",
                Address: "12150 NE Olive Dr",
                City: "Kingston",
                State: "WA",
                Zip: "98346",
                DateCreated: new Date()
            },
            {
                Title: "Need my land cleared",
                Description: "1/4 acre land in Kingston needs to be cleared before construction on house may begin.",
                Category: "Landscaping",
                Address: "12150 NE Olive Dr",
                City: "Kingston",
                State: "WA",
                Zip: "98346",
                DateCreated: new Date()
            },
            {
                Title: "Water heater needs to be fixed",
                Description: "One of the elements burned out and I have the replacement, but I can't get the previous element out, it is correded.",
                Category: "Appliances",
                Address: "6460 NE Prospect St",
                City: "Suquamish",
                State: "WA",
                Zip: "98392",
                DateCreated: new Date()
            },
            {
                Title: "Website for my dope business",
                Description: "I sell used diapers and need a website to advertise my dope ass business. Only local people plz nopne of that overseas BS.",
                Category: "Creative",
                Address: "613 Washington Ct SW",
                City: "Mukilteo",
                State: "WA",
                Zip: "98275",
                DateCreated: new Date()
            }
        ];

        work.forEach((w) => {
            getGpsCoords(w.Zip, w.City, w.Address).then((loc) => {
                User.findOne({}, (err, res) => { 
                    var userId = res.id;
                
                    Category.findOne({title: w.Category}, (err, res) => {
                        var catId = res.id;

                        var post = new Post({
                            user: userId,
                            category: catId,
                            title: w.Title,
                            body: w.Description,
                            location: {
                                type: "Point",
                                coordinates: [loc[1], loc[0]] // [longitude, latitude]
                            },
                            address: w.Address,
                            city: w.City,
                            state: w.State,
                            zip: w.Zip,
                            date_created: w.DateCreated,
                            comments: []
                        });

                        post.save();
                    });
                });
            });
        });
    }

    rtn(err, result) {
        if (err) console.log(err);
        return result;
    }

    async getCategories() {
        return await Category.find({}, this.rtn);
    }

    async getPosts(qs: QuerySettings) {
        var query = {
            location: {
                $near: {
                    $maxDistance: qs.distance * 1609.344, // 1 mile = 1609.344 meters
                    $geometry: {
                        type: "Point",
                        coordinates: [qs.coords.long, qs.coords.lat]
                    }
                }
            }
        };

        if (qs.categories && qs.categories.length > 0) {
            query['category'] = { $in: qs.categories };
        }
        
        return await Post.find(query, this.rtn);
    }

    async getPost(id: string) {
        return await Post.findOne({
            _id: id
        }, this.rtn);
    }

    async createPost(postObj) {
        var post = new Post({
            title: postObj.title,
            body: postObj.body,
            user: postObj.user,
            category: postObj.category,
            city: postObj.city,
            state: 'WA',
            date_created: new Date(),
            comments: []
        });
        return await getGpsCoords(null, postObj.city, postObj.address)
            .then((loc: {lat: number, long: number}) => {
                if (loc) {
                    post.location = {
                        type: 'Point',
                        coordinates: [loc.long, loc.lat]
                    }
                    return post.save().then(p => p);
                }
            });
    }
}

export default BusinessLogic;