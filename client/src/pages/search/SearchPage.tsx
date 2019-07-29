import * as React from 'react';
import { get, post } from '../../utils/request';
import { SearchCategories, ListOptionInput } from './SearchCategories';
import { SearchOptions, SearchOptionsValue } from './SearchOptions';
import SearchResults from './SearchResults';
import { PostModel, CategoryModel } from '../../models/data'
import { Link } from 'react-router-dom';

interface P {
}

interface S {
    categories: string[],
    options: SearchOptionsValue,
    results: Array<PostModel>;
}

class SearchPage extends React.Component<P, S> {

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
        get('/api/categories')
        .then((response: CategoryModel[]) => {
            var list: ListOptionInput[] = [];
            response.forEach(c => {
                list.push({
                    name: c._id,
                    label: c.title
                });
            });
            callback(list);
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

    search(newState: S): void {
        navigator.geolocation.getCurrentPosition((p) => {
            var qs = {
                categories: newState.categories,
                distance: newState.options.distance,
                location: newState.options.location,
                coords: { lat: p.coords.latitude, long: p.coords.longitude }
            };

            post('/api/posts', qs).then((response: PostModel[]) => {
                newState.results = response;
                this.setState(newState);
            });
        });
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
                <div className="col-md-8">
                    <SearchOptions onUpdate={(o) => this.updateLocation(o)} value={this.state.options} />
                    <SearchResults value={this.state.results} />
                </div>
                <div className="col-md-2">
                    <Link to="/post"><button className="create-post link-btn"><span className="plus"></span>Create Post</button></Link>
                </div>
            </div>
        );
    }
}

export default SearchPage;
