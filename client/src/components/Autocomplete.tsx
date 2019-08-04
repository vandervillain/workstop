import * as React from 'react';
import * as _ from 'lodash';
import { isDescendant } from 'src/utils/utils';

export interface P {
  inputRef?;
  name: string;
  required: boolean;
  label?: string;
  defaultValue?: string;
  options?: {key: string, value: string}[];
  autofocus?: boolean;
  onFocus?: (e) => void;
  onDone?: (name: string, value: any) => void;
}

interface S { }

export class Autocomplete extends React.Component<P, S> {
  inputRef;

  constructor(props: P) {
    super(props);
    this.inputRef = this.props.inputRef ? this.props.inputRef : React.createRef();
  }

  ifEnterClose(e: KeyboardEvent) {
    if (e.which == 13 || e.keyCode == 13) {
      e.preventDefault();
      if (this.props.onDone) {
        this.props.onDone(this.inputRef.current.name, this.inputRef.current.value);
      }
    }
  }

  onFocus(e) {
    e.target.select();
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  autocomplete(input: HTMLInputElement, list: string[]) {
    var plugin = this, currentFocus,
      insertAfter = (newNode, referenceNode)  => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      },
      addActive = (list: any) => {
        if (!list) return false;
        removeActive(list);
        if (currentFocus >= list.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (list.length - 1);
        list[currentFocus].classList.add("active");
        return;
      },
      removeActive = (list) => {
        for (var i = 0; i < list.length; i++) {
          list[i].classList.remove("active");
        }
      },
      closeAllLists = (el?: HTMLElement) => {
        if (!el || (el.className !== "autocomplete-items" && !isDescendant('btn-options', el))) {
          // close all autocomplete lists in the document except el
          var items = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < items.length; i++) {
            if (el != items[i] && el != input) items[i].remove();
          }
        }
      };

    input.addEventListener("input", (e) => {
        var listDiv = document.createElement("DIV"), val = input.value;

        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        listDiv.setAttribute("class", "autocomplete-items");
        insertAfter(listDiv, input);
        //(input.parentNode as HTMLElement).appendChild(listDiv);

        for (var s in list) {
          var item = list[s];
          var contains = item.toLowerCase().includes(val.toLowerCase());

          if (contains) {
            var inner = document.createElement("div");
            inner.dataset.value = item;

            var parsed = "";
            var startIndex = item.toLowerCase().indexOf(val.toLowerCase());
            
            if (startIndex > 0) parsed += item.substring(0, startIndex);
            parsed += "<strong>" + item.substr(startIndex, val.length) + "</strong>";
            parsed += item.substr(startIndex + val.length);

            inner.innerHTML = parsed;

            inner.addEventListener("click", (e) => {
              var val = (e.target as HTMLElement).dataset.value as string;
              if (val) {
                input.value = val;
                closeAllLists();
                if (plugin.props.onDone) {
                  plugin.props.onDone(plugin.props.name, input.value);
                }
              }
            });

            listDiv.appendChild(inner);
          }
        }

        return;
    });

    input.addEventListener("keydown", (e) => {
        var list: any = document.getElementsByClassName("autocomplete-items")[0];
        if (list) list = list.getElementsByTagName("div");
        if (e.keyCode == 40) {
          // If the arrow DOWN key is pressed increase the currentFocus variable
          currentFocus++;
          addActive(list);
        } else if (e.keyCode == 38) { //up
          // If the arrow UP key is pressed, decrease the currentFocus variable
          currentFocus--;
          addActive(list);
        } else if (e.keyCode == 13) { // enter
          e.preventDefault();
          if (currentFocus > -1) {
            // simulate a click on the "active" item
            if (list) list[currentFocus].click();
            closeAllLists();
          }
          else {
            var match = _.find(plugin.props.options, (o) => o.value.toLowerCase() == input.value.toLowerCase());
            if (match) {
              closeAllLists();
              if (plugin.props.onDone) plugin.props.onDone(plugin.props.name, match.value);
            }
          }
        }
    });

    document.removeEventListener("click", (e) => closeAllLists(e.target as HTMLElement));
    document.addEventListener("click", (e) => closeAllLists(e.target as HTMLElement));
  }

  componentDidMount() {
    var input = this.inputRef.current as HTMLInputElement;
    this.autocomplete(input, _.map(this.props.options, (o) => o.value));

    if (this.props.autofocus) {
      input.focus();
    }
  }
  
  public render()
  {
    return (
      <div className="autocomplete">
        {this.props.label && 
          <span className="label">{this.props.label}</span>
        }
        <input ref={this.inputRef} required={this.props.required} autoComplete="off" type="text" name={this.props.name} className="autocomplete-input" onFocus={(e) => this.onFocus(e)} defaultValue={this.props.defaultValue} />
        { this.props.required &&
          <span className="required">*</span>
        }
      </div>
    )
  }
}