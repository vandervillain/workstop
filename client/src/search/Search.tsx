import * as React from 'react';
import {SearchCategories, ListOptionInput} from './SearchCategories';
import {SearchOptions, SearchOptionsValue} from './SearchOptions';
import SearchResults from './SearchResults';
import { QuerySettings } from '../../../server/logic/workLogic';

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

class Search extends React.Component<P, S> {

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

    updateCategories(selected: string[]): void {
        var newState = {...this.state};
        newState.categories = selected;
        this.search(newState);
    }

    updateLocation(options: SearchOptionsValue): void {
        var newState = {...this.state};
        newState.options = options;
        this.search(newState);
    }

    search(state: S): void {
        var qs: QuerySettings = {
            categories: this.state.categories,
            distance: this.state.options.distance,
            location: this.state.options.location
        };

        fetch('/work', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(qs)
        })
        .then(res => res.json())
        .then((response: Work[]) => {
            var newState = {...state};
            newState.results = response;
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
                    <SearchCategories onUpdate={(selected) => this.updateCategories(selected)} query={this.getCategories} default={this.state.categories} />
                </div>
                <div className="col-md-10">
                    <SearchOptions onUpdate={(o) => this.updateLocation(o)} value={this.state.options} />
                    <SearchResults value={this.state.results} />
                </div>
            </div>
        );
    }
}

export default Search;
