import * as React from 'react';
import { Input, P } from './Input';

export class RangeInput extends Input {
  labels = [];

  constructor(props: P) {
    super(props);
  }

  public render()
  {
    return (
      <div className="range-input noselect">
        <ul>
          {(this.props.map as []).map(v => 
            <li key={v}>{v + "mi"}</li>
          )}
        </ul>
        <div className="input-container">
          <input type={this.props.type} min={this.props.min} max={this.props.max} name={this.props.name} onKeyDown={(e) => this.ifEnterClose(e)} defaultValue={this.props.defaultValue} />
        </div>
      </div>
    )
  }
}