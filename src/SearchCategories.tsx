import * as React from 'react';

interface P {
  update: React.FormEventHandler;
}

interface S {
}

class SearchCategories extends React.Component<P, S> {
  public render() {
    return (
      <div className="search-categories">
      <h1>Find work</h1>
        <ul>
          <li><span className="checkbox empty" /><span>Construction</span></li>
          <li><span className="checkbox empty" /><span>Landscaping</span></li>
          <li><span className="checkbox empty" /><span>Appliances</span></li>
          <li><span className="checkbox empty" /><span>Creative</span></li>
        </ul>
      </div>
    );
  }
}

export default SearchCategories;
