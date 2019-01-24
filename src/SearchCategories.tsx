import * as React from 'react';

export interface ListOptionInput {
  name: string;
  label: string;
}

interface P {
  update: (categories: string[]) => void;
  categories: ListOptionInput[];
}

interface S {
  value: string[];
}

export class SearchCategories extends React.Component<P, S> {
  
  constructor(props: P) {
    super(props);
    this.state = {
      value: []
    };
  }

  onClick(e: React.MouseEvent) {
    var el = e.currentTarget as HTMLElement,
        name = el.getAttribute('data-name') as string,
        newState = {...this.state},
        i = newState.value.indexOf(name);

    if (i !== -1){
      newState.value.splice(i, 1);
    }
    else newState.value.push(name);

    this.setState(newState);
    this.props.update(newState.value);
  }

  getClassName(name: string) {
    return this.state.value.indexOf(name) !== -1 ? "checkbox" : "checkbox empty"
  }

  public render() {
    var self = this;
    return (
      <div className="search-categories">
      <h1>Find work</h1>
        <ul>
          {this.props.categories.map(c => 
            <li key={c.name} data-name={c.name} onClick={(e) => self.onClick(e)}><span className={self.getClassName(c.name) } /><span>{c.label}</span></li>
          )}
        </ul>
      </div>
    );
  }
}