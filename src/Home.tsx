import * as React from 'react';
import SearchCategories from './SearchCategories';
import SearchOptions from './SearchOptions';

class Home extends React.Component {
  public render() {
    return (
        <div className="search-page row">
            <div className="col-md-2">
                <SearchCategories />
            </div>
            <div className="col-md-10">
                <SearchOptions />
                <div className="search-body">
                    <h2>HELLO</h2>
                    <p>Cras facilisis urna ornare ex volutpat, et
                    convallis erat elementum. Ut aliquam, ipsum vitae
                    gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                    metus nec massa. Maecenas hendrerit laoreet augue
                    nec molestie. Cum sociis natoque penatibus et magnis
                    dis parturient montes, nascetur ridiculus mus.</p>
            
                    <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
                </div>
            </div>
        </div>
      );
  }
}

export default Home;
