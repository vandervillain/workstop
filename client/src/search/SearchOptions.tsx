import * as React from 'react';
import {OptionButton, OptionButtonInput} from '../components/OptionButton';

export interface SearchOptionsValue
{
  distance: number;
  location: {city: string, state:string};
}

interface P {
  onUpdate: (value: SearchOptionsValue) => void;
  value: SearchOptionsValue;
}

interface S {
  value: SearchOptionsValue;
}

export class SearchOptions extends React.Component<P, S> {
  distanceMapping = [ 5, 10, 30, 50, 100, 200, 300 ];

  constructor(props: P) {
    super(props);

    this.state = {
      value: {
        distance: this.props.value.distance,
        location: this.props.value.location
      }
    }
  }

  getDistanceOptions(): OptionButtonInput[] {
    var rtn: OptionButtonInput[] = [];
    rtn.push({
      name: "distance",
      label: "Distance",
      type: "range",
      min: 0,
      max: 6,
      map: this.distanceMapping,
      default: this.state.value.distance != null ? this.distanceMapping.indexOf(this.state.value.distance) : 2
    });
    return rtn;
  }

  getLocationOptions(): OptionButtonInput[] {
    var rtn: OptionButtonInput[] = [];
    rtn.push({
      name: "city",
      label: "City",
      type: "string",
      default: this.state.value.location.city
    });
    rtn.push({
      name: "state",
      label: "State",
      type: "string",
      default: this.state.value.location.state
    });
    return rtn;
  }

  updateDistance(values: { [k: string]: any }): void { 
    var newState: S = { ...this.state };

    newState.value.distance = this.distanceMapping[values['distance']];
    
    this.setState(newState);
    this.props.onUpdate(newState.value);
  }

  updateLocation(values: { [k: string]: any }): void {
    var newState: S = { ...this.state };
    newState.value.location.city = values['city'];
    newState.value.location.state = values['state'];

    this.setState(newState);
    this.props.onUpdate(newState.value);
  }

  distanceText = (): string => "within " +  this.state.value.distance + " miles";
  locationText = (): string => this.state.value.location.city + ", " + this.state.value.location.state;

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