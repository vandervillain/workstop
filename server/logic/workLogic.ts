export interface QuerySettings {
    categories: string[],
    distance: number;
    location: {city: string, state:string};
}

export class WorkLogic {

    getCategories() {
        return [
            {name: "Construction", label: "Construction"},
            {name: "Landscaping", label: "Landscaping"},
            {name: "Appliances", label: "Appliances"},
            {name: "Creative", label: "Creative"}
        ];
    }

    getWork(qs: QuerySettings) {
        var rtn = [
            {
                Title: "Fix my gate",
                Description: "Post cracked at base and needs to be removed and replaced.",
                Category: "Construction",
                Distance: 5,
                DateCreated: new Date()
            },
            {
                Title: "Need house build",
                Description: "2600sqft house needs to be build in kingston wa",
                Category: "Construction",
                Distance: 15,
                DateCreated: new Date()
            },
            {
                Title: "Need my land cleared",
                Description: "1/4 acre land in Kingston needs to be cleared before construction on house may begin.",
                Category: "Landscaping",
                Distance: 15,
                DateCreated: new Date()
            },
            {
                Title: "Water heater needs to be fixed",
                Description: "One of the elements burned out and I have the replacement, but I can't get the previous element out, it is correded.",
                Category: "Appliances",
                Distance: 65,
                DateCreated: new Date()
            },
            {
                Title: "Website for my dope business",
                Description: "I sell used diapers and need a website to advertise my dope ass business. Only local people plz nopne of that overseas BS.",
                Category: "Creative",
                Distance: 80,
                DateCreated: new Date()
            }
        ];
        rtn = rtn.filter(r => qs.categories.length === 0 || qs.categories.indexOf(r.Category) !== -1);
        rtn = rtn.filter(r => r.Distance <= qs.distance);
        return rtn;
    }
}

export default WorkLogic;