import * as React from 'react';
import { OptionButtonInput } from './OptionButton';

export interface P {
  value: OptionButtonInput;
  onUpdate: (name: string, value: any) => void;
  onDone: (name: string, value: any) => void;
}

interface S {
  value: any;
}

export class Input extends React.Component<P, S> {

  constructor(props: P) {
    super(props);

    this.state = {
      value: props.value.default
    };
  }

  updateItemValue(e: React.ChangeEvent<HTMLInputElement>)
  {
    var val = e.currentTarget.value;
    this.setState({value: val});
    this.props.onUpdate(this.props.value.name, val);
  }

  ifEnterClose(e: React.KeyboardEvent<HTMLInputElement>)
  {
    if (this.props.onDone && (e.which == 13 || e.keyCode == 13)) {
      this.props.onDone(this.props.value.name, this.state.value);
    }
  }

  public render() {
    var self = this;

    return (      
      <div><span className="input-label">{this.props.value.label}</span><input type={this.props.value.type} min={this.props.value.min} max={this.props.value.max} name={this.props.value.name} onChange={(e) => self.updateItemValue(e)} onKeyDown={(e) => self.ifEnterClose(e)} value={self.state.value} /></div>
    );
  }
}