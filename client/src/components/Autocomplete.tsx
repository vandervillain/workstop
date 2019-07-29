import * as React from 'react';
import * as _ from 'lodash';

export interface P {
  name: string;
  defaultValue: string;
  options?: {key: string, value: string}[];
  onDone?: (name: string, value: any) => void;
}

interface S { }

export class Autocomplete extends React.Component<P, S> {
  inputRef;

  constructor(props: P) {
    super(props);
    this.inputRef = React.createRef();
  }

  ifEnterClose(e: KeyboardEvent) {
    if (this.props.onDone && (e.which == 13 || e.keyCode == 13)) {
      this.props.onDone(this.inputRef.current.name, this.inputRef.current.value);
    }
  }

  autocomplete(input: HTMLInputElement, list: string[]) {
    var plugin = this, currentFocus,
      insertAfter = (newNode, referenceNode)  => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      },
      isDescendant = (parentClass: string, child: HTMLElement) => {
        var p = child.parentElement;
        while (p) {
          if (p.classList && p.classList.contains(parentClass)) {
              return true;
          }
          p = p.parentElement;
        }
        return false;
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
          if (currentFocus > -1) {
            // prevent the form from being submitted and simulate a click on the "active" item
            e.preventDefault();
            if (list) list[currentFocus].click();
          }
          else {
            var match = _.find(plugin.props.options, (o) => o.value.toLowerCase() == input.value.toLowerCase());
            if (match && plugin.props.onDone) plugin.props.onDone(plugin.props.name, match.value);
          }
        }
    });

    document.removeEventListener("click", (e) => closeAllLists(e.target as HTMLElement));
    document.addEventListener("click", (e) => closeAllLists(e.target as HTMLElement));
  }

  componentDidMount() {
    var input = this.inputRef.current as HTMLInputElement;
    this.autocomplete(input, _.map(this.props.options, (o) => o.value));
    input.focus();
  }
  
  public render()
  {
    return (
      <input ref={this.inputRef} autoComplete="new-password" type="text" name={this.props.name} className="autocomplete" onFocus={(e) => e.target.select()} defaultValue={this.props.defaultValue} />
    )
  }
}