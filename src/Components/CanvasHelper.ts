import { Arrow } from "../Models/Arrow";
import { ArrowPart } from "../Models/ArrowPart";
import { Component } from "../behaviour/Components/Component";
import { Action } from "../behaviour/Components/Actions";
import { Decorator } from "../behaviour/Components/Decorator";
import { Composite } from "../behaviour/Components/Composite";

export class CanvasHelper {
  setArrowStart(compId: string, components: Component[], arrowPart: ArrowPart | null, arrows: Arrow[], setArrowPart: (arrowPart: ArrowPart | null) => void, setArrows: (arrow: Arrow[]) => void) {
    if (compId === arrowPart?.compId) {
      setArrowPart(null);
    } else if (arrowPart == null || arrowPart.type === 'top') {
      setArrowPart({ compId, type: 'top' });
    } else if (arrows.findIndex(x => x.startId === compId && x.endId === arrowPart.compId) === -1) {
      let parentComponent = components.find(x => x.Id === compId);
      let childComponent = components.find(x => x.Id === arrowPart.compId);

      if (parentComponent == null || childComponent == null) return; //TODO: Add snackbar

      if (parentComponent instanceof Action) { return; } //TODO: Add snackbar (actions can't be parents)

      if (parentComponent instanceof Decorator) { // Can only have 1 child
        if (parentComponent.children != null) {// Parent component already has a child
          // remove the arrow
          let arrowIndex = arrows.findIndex(x => parentComponent?.children instanceof Component && x.startId === parentComponent?.children?.Id && x.endId === arrowPart.compId);
          if (arrowIndex === -1) { return; } // TODO: Add snackbar
          arrows.splice(arrowIndex, 1);
          setArrows(arrows);

          // unlink the components
          parentComponent.children = null;
        }

        if (childComponent.parent != null) { // child component has a parent
          //  remove the arrow
          let arrowIndex = arrows.findIndex(x => x.endId === childComponent?.Id);
          arrows.splice(arrowIndex, 1);
          setArrows(arrows);
          // unlink the components
          childComponent.parent = null;
        }
      }

      if (parentComponent instanceof Composite) { } // Can have array of children



      setArrows([...arrows, { startId: compId, endId: arrowPart.compId }]);
      setArrowPart(null);
      parentComponent.children = childComponent;
      childComponent.parent = parentComponent;
    }
  }

  setArrowEnd(compId: string, components: Component[], arrowPart: ArrowPart | null, arrows: Arrow[], setArrowPart: (arrowPart: ArrowPart | null) => void, setArrows: (arrow: Arrow[]) => void) {
    if (compId === arrowPart?.compId) {
      setArrowPart(null);
    } else if (arrowPart == null || arrowPart.type === 'bottom') {
      setArrowPart({ compId, type: 'bottom' });
    } else if (arrows.findIndex(x => x.startId === arrowPart.compId && x.endId === compId) === -1) {
      //FIXME: add component relationship
      setArrows([...arrows, { startId: arrowPart.compId, endId: compId }]);
      setArrowPart(null);
    }
  }
}