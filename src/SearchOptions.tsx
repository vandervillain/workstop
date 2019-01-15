import * as React from 'react';

class SearchOptions extends React.Component {
  public render() {
    return (
        <div className="search-options row">
          <div className="col-md-6">
            <div className="distance search-option-btn">
              within 30 miles
            </div>
            <div className="location search-option-btn">
              Suquamish, WA
            </div>
          </div>
          <div className="col-md-6">
          </div>
        </div>
      );
  }
}

export default SearchOptions;
