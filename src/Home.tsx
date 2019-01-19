import * as React from 'react';
import SearchCategories from './SearchCategories';
import SearchOptions from './SearchOptions';
import SearchResults from './SearchResults';

export interface Work {
    Title: string;
    Description: string;
    DateCreated: Date;
}

interface SearchOptionsData {
    distance: number,
    location: {
        city: string,
        state: string
    }
}

interface P {
}

interface S {
    categories: string[],
    options: SearchOptionsData,
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

    changeCategories(categories: string[]) {
        var newState = {...this.state};
        newState.categories = categories;
        this.setState(newState);
    }

    changeOptions(options: SearchOptionsData) {
        var newState = {...this.state};
        newState.options = options;
        this.setState(newState);
    }
    
    public render() {
        return (
            <div className="search-page row">
                <div className="col-md-2">
                    <SearchCategories update={this.changeCategories.bind(this)} />
                </div>
                <div className="col-md-10">
                    <SearchOptions update={this.changeOptions.bind(this)} default={this.state.options} />
                    <SearchResults results={this.state.results} />
                </div>
            </div>
        );
    }
}

export default Home;
