import * as React from 'react';
import { Input } from './Input';
import { RangeInput } from './RangeInput';
import { Autocomplete } from './Autocomplete';

export interface OptionButtonInput {
  name: string;
  label: string;
  type: string;
  min?: number;
  max?: number;
  map?: number[];
  options?: { key: string, value:string }[];
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
    this.props.options.forEach((o) => this.state.values[o.name] = o.value );
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

  apply(el: HTMLElement) {
    var newState = {...this.state};
    newState.active = false;

    // gather through all input values
    var values: { name: string, value: string}[] = [];
    this.pullValuesRecursive(el, values);
    for (var v in values) newState.values[values[v].name] = values[v].value;

    this.setState(newState);

    // need to send this option button's input values to parent
    this.props.onDone(newState.values);
  }

  pullValuesRecursive(el: HTMLElement, values: { name: string, value: string }[]) {
    for (var c = 0; c < el.children.length; c++) {
      var input = el.children[c] as HTMLInputElement;
      if (input && input.name && input.value !== undefined) {
        values.push({ name: input.name, value: input.value });
      }
      else if (el.children[c].children.length > 0) this.pullValuesRecursive(el.children[c] as HTMLElement, values);
    }
  }

  setValue(name?: string, value?: any) {
    var newState = {...this.state};
    newState.active = false;

    if (name && value !== undefined)
    {
      newState.values[name] = value;
    }

    this.setState(newState);

    // need to send this option button's input values to parent
    this.props.onDone(newState.values);
  }

  isClickOutside(e: MouseEvent) {
    var clickedNode: Node = e.toElement;
    if (!this.div || (clickedNode != this.div && !this.div.contains(clickedNode))) {
      this.close();
    }
  }

  getClassName = () => this.props.className + " option-btn" + (this.state.active ? " active" : "");

  renderOption(o: OptionButtonInput) {
    var self = this;
    if (o.type == "range")
    {
      return <RangeInput key={o.name} type={o.type} name={o.name} required={false} min={o.min} max={o.max} defaultValue={o.value} map={o.map} onDone={(n, v) => self.setValue(n, v)} />
    }
    else if (o.type == "autocomplete")
    {
      return <Autocomplete key={o.name} required={false} options={o.options} name={o.name} defaultValue={o.value} autofocus={true} onDone={(n, v) => self.setValue(n, v)} />
    }
    else return <Input key={o.name} type={o.type} name={o.name} required={false} min={o.min} max={o.max} defaultValue={o.value} onDone={(n, v) => self.setValue(n, v)} />
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
            <button onClick={(e) => this.apply((e.target as HTMLElement).parentElement as HTMLElement)}>{this.props.buttonLabel}</button>
          </div>
        }
      </div>
    );
  }
}