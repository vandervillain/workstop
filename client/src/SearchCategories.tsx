import * as React from 'react';

export interface ListOptionInput {
  name: string;
  label: string;
}

interface P {
  onUpdate: (category: string) => void;
  value: string[];
  query: (callback: (list: ListOptionInput[]) => void) => any;
}

interface S {
  categories: ListOptionInput[];
}

export class SearchCategories extends React.Component<P, S> {
  
  constructor(props: P) {
    super(props);
    this.state = { categories: [] };
  }

  getGlyph(name: string): string {
    return this.props.value.indexOf(name) !== -1 ? "checkbox" : "checkbox empty"
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
            <li key={c.name} onClick={() => self.props.onUpdate(c.name)}><span className={self.getGlyph(c.name) } /><span>{c.label}</span></li>
          )}
        </ul>
      </div>
    );
  }
}