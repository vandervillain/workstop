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
    var self = this;
    return <div className="range-input noselect">
      {/* <span className="input-label">{this.props.value.label}</span> */}
      <ul>
        {(this.props.value.map as []).map(v => 
          <li>{v + "mi"}</li>
        )}
      </ul>
      <div className="input-container">
        <input type={this.props.value.type} min={this.props.value.min} max={this.props.value.max} name={this.props.value.name} onChange={(e) => self.updateItemValue(e)} onKeyDown={(e) => self.ifEnterClose(e)} value={self.state.value} />
      </div>
    </div>
  }
}