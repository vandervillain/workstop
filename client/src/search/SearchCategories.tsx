import * as React from 'react';

export interface ListOptionInput {
  name: string;
  label: string;
}

interface P {
  onUpdate: (selected: string[]) => void;
  default: string[];
  query: (callback: (list: ListOptionInput[]) => void) => any;
}

interface S {
  categories: ListOptionInput[];
  selected: string[]
}

export class SearchCategories extends React.Component<P, S> {
  
  constructor(props: P) {
    super(props);
    this.state = { 
      categories: [],
      selected: this.props.default ? this.props.default : []
     };
  }

  getGlyph(name: string): string {
    return this.props.default.indexOf(name) !== -1 ? "checkbox" : "checkbox empty"
  }

  onClick(name: string) {
    var newState = {...this.state};
    var i = newState.selected.indexOf(name);
    if (i !== -1) newState.selected.splice(i, 1);
    else newState.selected.push(name);

    this.setState(newState)
    this.props.onUpdate(newState.selected);
  }

  public componentDidMount() {
    var self = this;
    self.props.query(categories => self.setState({categories}))
  }

  public render() {
    var self = this;
    return (
      <div className="search-categories">
      <h1>Find work</h1>
        <ul>
          {this.state.categories.map(c => 
            <li key={c.name} onClick={() => self.onClick(c.name)}><span className={self.getGlyph(c.name) } /><span>{c.label}</span></li>
          )}
        </ul>
      </div>
    );
  }
}