import * as React from 'react';

export interface OptionButtonInput {
  name: string;
  label: string;
  type: string;
  value: any;
}

interface P {
  className: string;
  text: string;
  buttonLabel: string;
  options: OptionButtonInput[];
  onDone: (values: { [k: string]: any }) => void;
}

interface S {
  active: boolean;
  values: { [k: string]: any };
}

export class OptionButton extends React.Component<P, S> {
  div: Node | null;
  boundListener: any;

  constructor(props: P) {
    super(props);

    this.state = {
      active: false,
      values: []
    };

    this.props.options.forEach((o) => this.state.values[o.name] = o.value );
  }

  open(e: React.MouseEvent) {
    e.preventDefault();
    
    if (!this.state.active) {
      var newState = {...this.state};
      newState.active = true;

      this.setState(newState);
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

  updateItemValue(e: React.ChangeEvent<HTMLInputElement>)
  {
    var newState = {...this.state};
    var val = e.currentTarget.value,
        name = e.currentTarget.name;

    newState.values[name] = val;
    this.setState(newState);
  }

  done(e: React.MouseEvent)
  {
    var newState = {...this.state};
    newState.active = false;
    this.setState(newState);
    if (this.props.onDone) this.props.onDone(this.state.values);
  }

  isClickOutside(e: MouseEvent)
  {
    var clickedNode: Node = e.toElement;
    if (this.div != null && clickedNode != this.div && !this.div.contains(clickedNode)) {
      this.close();
    }
  }

  public componentDidUpdate () {
    if (this.state.active) {
      this.boundListener = this.isClickOutside.bind(this);
      document.addEventListener('click', this.boundListener, true);
    }
  }

  public render() {
    var self = this;

    return (      
      <div ref={(el) => { this.div = el; }} className={this.props.className + " search-option-btn"} onClick={this.open.bind(this)}>
        {this.props.text}
        {this.state.active && this.props.options.length > 0 &&
          <div className="btn-options">
            {this.props.options.map(function(o) {
              return <span key={o.name}>{o.label} <input type={o.type} name={o.name} onChange={self.updateItemValue.bind(self)} value={self.state.values[o.name]} /></span>
            })
            }
            <button onClick={this.done.bind(this)}>{this.props.buttonLabel}</button>
          </div>
        }
      </div>
    );
  }
}