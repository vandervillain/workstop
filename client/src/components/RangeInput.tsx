import * as React from 'react';
import { Input, P } from './Input';

export class RangeInput extends Input {

  constructor(props: P) {
    super(props);
  }

  public render()
  {
    var self = this;
    return <div>
      <div>asdf</div>
        <span className="input-label">{this.props.value.label}</span><input type={this.props.value.type} min={this.props.value.min} max={this.props.value.max} name={this.props.value.name} onChange={(e) => self.updateItemValue(e)} onKeyDown={(e) => self.ifEnterClose(e)} value={self.state.value} />
      </div>
  }
}