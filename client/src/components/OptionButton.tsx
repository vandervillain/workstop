import * as React from 'react';
import { Input } from './Input';
import { RangeInput } from './RangeInput';

export interface OptionButtonInput {
  name: string;
  label: string;
  type: string;
  min?: number;
  max?: number;
  map?: number[];
  default?: any;
  value?: any;
}

interface P {
  className: string;
  text: string;
  buttonLabel: string;
  options: OptionButtonInput[];
  defaultActive?: boolean;
  onDone: (values: { [k: string]: any }) => void;
}

interface S {
  active: boolean;
  values: { [k: string]: any };
}

export class OptionButton extends React.Component<P, S> {
  div: Node;
  boundListener: any;

  constructor(props: P) {
    super(props);

    this.state = {
      active: this.props.defaultActive === true,
      values: []
    };

    // set default values for inputs in state
    this.props.options.forEach((o) => this.state.values[o.name] = o.default );
  }

  toggleOptions() {
    if (this.state.active) this.close();
    else this.open();
  }

  open() {    
    if (!this.state.active) {
      var newState = {...this.state};
      newState.active = true;

      this.setState(newState);

      this.boundListener = this.isClickOutside.bind(this);
      document.addEventListener('click', this.boundListener, true);
    }
  }

  close() {    
    if (this.state.active) {
      var newState = {...this.state};
      newState.active = false;

      document.removeEventListener('click', this.boundListener, true);

      this.setState(newState);
    }
  }

  apply(name?: string, value?: any)
  {
    var newState = {...this.state};
    newState.active = false;

    if (name !== undefined && value !== undefined)
    {
      newState.values[name] = value;
    }

    this.setState(newState);

    // need to send this option button's input values to parent
    this.props.onDone(newState.values);
  }

  updateInput(name: string, value: any) {
    var newState = {...this.state};
    newState.values[name] = value;
    this.setState(newState);
  }

  isClickOutside(e: MouseEvent)
  {
    var clickedNode: Node = e.toElement;
    if (clickedNode != this.div && !this.div.contains(clickedNode)) {
      this.close();
    }
  }

  getClassName = () => this.props.className + " option-btn" + (this.state.active ? " active" : "");

  renderOption(o: OptionButtonInput)
  {
    var self = this;
    if (o.type == "range")
    {
      return <RangeInput key={o.name} value={o} onUpdate={(n, v) => self.updateInput(n, v)} onDone={(n, v) => self.apply(n, v)} />
    }
    else return <Input key={o.name} value={o} onUpdate={(n, v) => self.updateInput(n, v)} onDone={(n, v) => self.apply(n, v)} />
  }

  public render() {
    var self = this;

    return (      
      <div ref={(el) => { this.div = el as Node; }} className={this.getClassName()}>
        <div className="label-btn" onClick={() => this.toggleOptions()}>{this.props.text}</div>
        {this.state.active && this.props.options.length > 0 &&
          <div className="btn-options">
            {this.props.options.map(function(o) {
              return self.renderOption(o)
            })
            }
            <button onClick={() => this.apply()}>{this.props.buttonLabel}</button>
          </div>
        }
      </div>
    );
  }
}