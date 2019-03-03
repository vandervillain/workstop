import * as React from 'react';
import { Work } from './Search'

interface P {
  value: Array<Work>;
}

interface S {
}

class SearchResults extends React.Component<P, S> {

  constructor(props: P) {
    super(props);
  }

  public render() {
    return (
      <div className="search-body">
        {this.props.value.map((result, i) => (
          <div className="search-result" key={i}>
            <h2>{result.Title}</h2>
            <p>{result.Description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;
