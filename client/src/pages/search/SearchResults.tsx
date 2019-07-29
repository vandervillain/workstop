import * as React from 'react';
import { PostModel } from '../../models/data';
import { withRouter } from 'react-router';

interface P {
  value: Array<PostModel>;
  match; 
  location;
  history;
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
          <div className="search-result" key={i} onClick={(e) => this.props.history.push(`/post/${result._id}`)}>
            <h2>{result.title}</h2>
            <p>{result.city + " - " + result.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(SearchResults);
