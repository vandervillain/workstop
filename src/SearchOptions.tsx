import * as React from 'react';
import {OptionButton, OptionButtonInput} from './OptionButton';

export interface SearchOptionsValue
{
  distance: number;
  location: {city: string, state:string};
}

interface P {
  update: (value: SearchOptionsValue) => void;
  value: SearchOptionsValue;
}

interface S {
  value: SearchOptionsValue;
}

export class SearchOptions extends React.Component<P, S> {

  constructor(props: P) {
    super(props);

    this.state = {
      value: {
        distance: this.props.value.distance,
        location: this.props.value.location
      }
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
    newState.value.distance = values['distance'];
    
    this.setState(newState);
    this.props.update(newState.value);
  }

  updateLocation(values: { [k: string]: any })
  {
    var newState: S = { ...this.state };
    newState.value.location.city = values['city'];
    newState.value.location.state = values['state'];

    this.setState(newState);
    this.props.update(newState.value);
  }

  distanceText = () => "within " +  this.state.value.distance + " miles";
  locationText = () => this.state.value.location.city + ", " + this.state.value.location.state;

  public render() {
    return (
        <div className="search-options row">
          <div className="col-md-12">
            <OptionButton className="distance" text={this.distanceText()} buttonLabel="Apply" options={this.getDistanceOptions()} onDone={(v) => this.updateDistance(v)} />
            <OptionButton className="location" text={this.locationText()} buttonLabel="Apply" options={this.getLocationOptions()} onDone={(v) => this.updateLocation(v)} />
          </div>
        </div>
      );
  }
}