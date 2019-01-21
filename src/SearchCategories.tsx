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
  values: string[];
}

export class SearchCategories extends React.Component<P, S> {
  
  constructor(props: P) {
    super(props);
    this.state = {
      values: []
    };
  }

  onClick(e: MouseEvent) {
    var el = e.currentTarget as HTMLElement,
        name = el.getAttribute('data-name') as string,
        newState = {...this.state},
        i = newState.values.indexOf(name);

    if (i !== -1){
      newState.values.splice(i, 1);
    }
    else newState.values.push(name);

    this.setState(newState);
    this.props.update(newState.values);
  }

  public render() {
    var self = this;
    return (
      <div className="search-categories">
      <h1>Find work</h1>
        <ul>
          {this.props.categories.map(function(c) {
            return <li key={c.name} data-name={c.name} onClick={self.onClick.bind(self)}><span className={self.state.values.indexOf(c.name) !== -1 ? "checkbox" : "checkbox empty"} /><span>{c.label}</span></li>
          })}
        </ul>
      </div>
    );
  }
}