import * as React from 'react';
import { OptionButtonInput } from './OptionButton';

export interface P {
  value: OptionButtonInput;
  onDone: (name: string, value: any) => void;
}

interface S {}

export class Input extends React.Component<P, S> {
  inputRef;

  constructor(props: P) {
    super(props);

    this.inputRef = React.createRef();
  }

  ifEnterClose(e: React.KeyboardEvent<HTMLInputElement>) {
    if (this.props.onDone && (e.which == 13 || e.keyCode == 13)) {
      this.props.onDone(this.inputRef.current.name, this.inputRef.current.value);
    }
  }

  public render() {
    return (      
      <div><span className="input-label">{this.props.value.label}</span><input ref={this.inputRef} type={this.props.value.type} min={this.props.value.min} max={this.props.value.max} name={this.props.value.name} onKeyDown={(e) => this.ifEnterClose(e)} defaultValue={this.props.value.value} /></div>
    );
  }
}