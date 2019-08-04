import * as React from 'react';

export interface P {
  inputRef?;
  type: string;
  name: string;
  label?: string;
  min?: number;
  max?: number;
  required: boolean;
  defaultValue?;
  map?: number[];
  onFocus?: (e) => void;
  onDone?: (name: string, value: any) => void;
}

interface S {}

export class Input extends React.Component<P, S> {
  inputRef;

  constructor(props: P) {
    super(props);

    this.inputRef = this.props.inputRef ? this.props.inputRef : React.createRef();
  }

  ifEnterClose(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.which == 13 || e.keyCode == 13) {
      e.preventDefault();
      if (this.props.onDone) {
        this.props.onDone(this.inputRef.current.name, this.inputRef.current.value);
      }
    }
  }

  public render() {
    return (      
      <div className="input">
        {this.props.label && 
          <span className="label">{this.props.label}</span>
        }
        <input ref={this.inputRef} type={this.props.type} required={this.props.required} min={this.props.min} max={this.props.max} name={this.props.name} onKeyDown={(e) => this.ifEnterClose(e)} onFocus={(e) => this.props.onFocus ? this.props.onFocus(e) : true} defaultValue={this.props.defaultValue} />
        { this.props.required && 
          <span className="required">*</span>
        }
      </div>
    );
  }
}