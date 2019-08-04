export const getAncestor = (parentClass: string, child: HTMLElement) => {
  var p = child.parentElement;
  while (p) {
    if (p.classList && p.classList.contains(parentClass)) {
        return p;
    }
    p = p.parentElement;
  }
  return undefined;
}

export const getAncestorByTag = (parentTag: string, child: HTMLElement) => {
  var p = child.parentElement;
  while (p) {
    if (p.tagName && p.tagName.toLowerCase() == parentTag.toLowerCase()) {
        return p;
    }
    p = p.parentElement;
  }
  return undefined;
}

export const isDescendant = (parentClass: string, child: HTMLElement) => {
  var p = child.parentElement;
  while (p) {
    if (p.classList && p.classList.contains(parentClass)) {
        return true;
    }
    p = p.parentElement;
  }
  return false;
}