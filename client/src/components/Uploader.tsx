import * as React from 'react';

export interface P {
  name: string;
  label?: string;
  required?: boolean;
}

interface S {}

export class Uploader extends React.Component<P, S> {
  inputRef;

  constructor(props: P) {
    super(props);

    this.inputRef = React.createRef();
  }

  public render() {
    return (      
      <div className="uploader">
        {this.props.label && 
          <span className="label">{this.props.label}</span>
        }
        <input ref={this.inputRef} type="file" name={this.props.name} />
        { this.props.required && 
          <span className="required">*</span>
        }
      </div>
    );
  }
}