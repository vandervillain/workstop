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

    constructor(props: any) {
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

    getCategories(callback: (list: ListOptionInput[]) => void) {
        fetch('/categories')
        .then(res => res.json())
        .then((response: ListOptionInput[]) => {
            console.log(response);
            callback(response);
        });
    }

    toggleCategory(name: string): void {
        var newState = {...this.state},
            i = newState.categories.indexOf(name);

        if (i !== -1) newState.categories.splice(i, 1);
        else newState.categories.push(name);

        this.search(newState);
    }

    changeOptions(options: SearchOptionsValue): void {
        var newState = {...this.state};
        newState.options = options;
        this.search(newState);
    }

    search(state: S): void {
        fetch('/work')
        .then(res => res.json())
        .then((response: Work[]) => {
            console.log(response);

            var newState = {...state};
            newState.results = response.filter(r => newState.categories.length === 0 || newState.categories.indexOf(r.Category) !== -1);
            newState.results = newState.results.filter(r => r.Distance <= newState.options.distance);
            this.setState(newState);
        })
    }

    componentDidMount(): void {
        this.search(this.state);
    }
    
    public render() {
        return (
            <div className="search-page row">
                <div className="col-md-2">
                    <SearchCategories onUpdate={(name) => this.toggleCategory(name)} query={this.getCategories} value={this.state.categories} />
                </div>
                <div className="col-md-10">
                    <SearchOptions onUpdate={(o) => this.changeOptions(o)} value={this.state.options} />
                    <SearchResults value={this.state.results} />
                </div>
            </div>
        );
    }
}

export default Home;
