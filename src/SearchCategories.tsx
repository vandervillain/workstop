import * as React from 'react';

class SearchCategories extends React.Component {
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
