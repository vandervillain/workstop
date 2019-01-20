import * as React from 'react';
import {OptionButton, OptionButtonInput} from './OptionButton';

interface P {
  update: (state: S) => void;

  default: {
    distance: number;
    location: {city: string, state:string};
  }
}

interface S {
  distance: number;
  location: {city: string, state:string};
}

class SearchOptions extends React.Component<P, S> {

  constructor(props: P) {
    super(props);

    this.state = {
      distance: this.props.default.distance,
      location: this.props.default.location
    }
  }

  getDistanceOptions() {
    var rtn: OptionButtonInput[] = [];
    rtn.push({
      name: "distance",
      label: "Distance",
      type: "number",
      value: 30
    });
    return rtn;
  }

  getLocationOptions() {
    var rtn: OptionButtonInput[] = [];
    rtn.push({
      name: "city",
      label: "City",
      type: "string",
      value: "Suquamish"
    });
    rtn.push({
      name: "state",
      label: "State",
      type: "string",
      value: "WA"
    });
    return rtn;
  }

  updateDistance(values: { [k: string]: any })
  {
    var newState: S = { ...this.state };
    newState.distance = values['distance'];
    
    this.setState(newState);
    this.props.update(newState);
  }

  updateLocation(values: { [k: string]: any })
  {
    var newState: S = { ...this.state };
    newState.location.city = values['city'];
    newState.location.state = values['state'];

    this.setState(newState);
    this.props.update(newState);
  }

  distanceText = () => "within " +  this.state.distance + " miles";
  locationText = () => this.state.location.city + ", " + this.state.location.state;

  public render() {
    return (
        <div className="search-options row">
          <div className="col-md-12">
            <OptionButton className="distance" text={this.distanceText()} buttonLabel="Apply" options={this.getDistanceOptions()} onDone={this.updateDistance.bind(this)} />
            <OptionButton className="location" text={this.locationText()} buttonLabel="Apply" options={this.getLocationOptions()} onDone={this.updateLocation.bind(this)} />
          </div>
        </div>
      );
  }
}

export default SearchOptions;
