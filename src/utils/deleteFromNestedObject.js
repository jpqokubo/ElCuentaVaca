export default function removeFromObject(parent, childNameToRemove) {
  parent.children = parent.children
    .filter(function(child) {
      return child.name !== childNameToRemove;
    })
    .map(function(child) {
      return removeFromObject(child, childNameToRemove);
    });
  return parent;
}
