import * as React from 'react';
import {SearchCategories, ListOptionInput} from './SearchCategories';
import {SearchOptions, SearchOptionsValue} from './SearchOptions';
import SearchResults from './SearchResults';

export interface Work {
    Title: string;
    Description: string;
    Category: string;
    Distance: number,
    DateCreated: Date;
}

interface P {
}

interface S {
    categories: string[],
    options: SearchOptionsValue,
    results: Array<Work>;
}

class Home extends React.Component<P, S> {

    constructor(props: any)
    {
        super(props);
        this.state = {
            categories: [],
            options: {
                distance: 30,
                location: {
                    city: "Suquamish",
                    state: "WA"
                }
            },
            results: []
        };
    }

    getCategories() {
        var list: ListOptionInput[] = [
            {name: "Construction", label: "Construction"},
            {name: "Landscaping", label: "Landscaping"},
            {name: "Appliances", label: "Appliances"},
            {name: "Creative", label: "Creative"}
        ];
        return list;
    }

    changeCategories(categories: string[]) {
        var newState = {...this.state};
        newState.categories = categories;
        this.search(newState);
    }

    changeOptions(options: SearchOptionsValue) {
        var newState = {...this.state};
        newState.options = options;
        this.search(newState);
    }

    search(state: S) {
        var results: Work[] = [
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

        var newState = {...state};
        newState.results = results.filter(r => newState.categories.length === 0 || newState.categories.indexOf(r.Category) !== -1);
        newState.results = newState.results.filter(r => r.Distance <= newState.options.distance);
        this.setState(newState);
    }

    componentDidMount()
    {
        this.search(this.state);
    }
    
    public render() {
        return (
            <div className="search-page row">
                <div className="col-md-2">
                    <SearchCategories update={(c) => this.changeCategories(c)} categories={this.getCategories()} />
                </div>
                <div className="col-md-10">
                    <SearchOptions update={(o) => this.changeOptions(o)} value={this.state.options} />
                    <SearchResults results={this.state.results} />
                </div>
            </div>
        );
    }
}

export default Home;
