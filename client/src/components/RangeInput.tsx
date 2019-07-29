import * as React from 'react';
import { Input, P } from './Input';

export class RangeInput extends Input {
  labels = [];

  constructor(props: P) {
    super(props);
    props.value.map
  }

  public render()
  {
    return (
      <div className="range-input noselect">
        <ul>
          {(this.props.value.map as []).map(v => 
            <li key={v}>{v + "mi"}</li>
          )}
        </ul>
        <div className="input-container">
          <input type={this.props.value.type} min={this.props.value.min} max={this.props.value.max} name={this.props.value.name} onKeyDown={(e) => this.ifEnterClose(e)} defaultValue={this.props.value.value} />
        </div>
      </div>
    )
  }
}