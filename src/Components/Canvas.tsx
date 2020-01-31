import React, { useState } from "react";
import { Component } from "../behaviour/Components/Component";
import { Engine } from "../behaviour/Engine";
import { Root } from "../behaviour/Components/Root";
import { Log } from "../behaviour/Components/Actions/Log";
import Draggable, { DraggableData } from "react-draggable";

import './Canvas.css';

interface IProps { engine: Engine }
export function Canvas(props: IProps) {
  const [components, setComponents] = useState<Component[]>([]);
  const [arrows, setArrows] = useState<{ startId: string, endId: string }[]>([]);
  const [arrowPart, setArrowPart] = useState<null | { compId: string, type: 'start' | 'end' }>(null);
  const [rerender, setRerender] = useState(0);

  function addRoot() {
    if (props.engine.root != null) return;
    props.engine.root = new Root('root');

    setComponents([...components, props.engine.root]);
  }

  function setArrowStart(compId: string) {
    if (arrowPart == null || arrowPart.type === 'start') {
      setArrowPart({ compId, type: 'start' });
    } else if (arrows.findIndex(x => x.startId === compId && x.endId === arrowPart.compId) === -1) {
      setArrows([...arrows, { startId: compId, endId: arrowPart.compId }]);
      setArrowPart(null);
    }
  }

  function setArrowEnd(compId: string) {
    if (arrowPart == null || arrowPart.type === 'end') {
      setArrowPart({ compId, type: 'end' });
    } else if (arrows.findIndex(x => x.startId === arrowPart.compId && x.endId === compId) === -1) {
      setArrows([...arrows, { startId: arrowPart.compId, endId: compId }]);
      setArrowPart(null);
    }
  }

  function compDragged(pos: DraggableData, compId: string) {
    let component = components.find(x => x.Id === compId);
    if (!component) return;
    component.htmlPosX = pos.x;
    component.htmlPosY = pos.y;
    setRerender(Math.random());
  }


  return <div>
    <button onClick={() => { addRoot() }}>Add root</button>
    <button onClick={() => setComponents([...components, new Log('log')])}>Add Log</button>

    <div id='canvas'>

      <div>
        {
          components.map(comp => {
            let myDiv = <Draggable key={comp.Id} cancel='.no-cursor' onDrag={(e, pos) => compDragged(pos, comp.Id)}>
              <div className='compCard'>
                {comp != props.engine.root &&
                  <div onClick={_ => setArrowEnd(comp.Id)} className='cardArrowIn no-cursor'></div>
                }
                <div className='compCardLabel'>{comp.label}</div>
                <div onClick={_ => setArrowStart(comp.Id)} className='cardArrowOut no-cursor'></div>
              </div>
            </Draggable>
            return myDiv;
          })
        }
      </div>

      {arrows.map(arrow => {
        let startComponent = components.find(x => x.Id === arrow.startId);
        let endComponent = components.find(x => x.Id === arrow.endId);
        if (!startComponent || !endComponent) {
          console.log('start of end of arrow missing');
          return;
        }
        let arrowStart = (startComponent.htmlPosX + 85) + ' , ' + (startComponent.htmlPosY + 120);
        let arrowEnd = (endComponent.htmlPosX + 85) + ' , ' + (endComponent.htmlPosY);

        let controlPointA = (startComponent.htmlPosX + 85) + ' , ' + (startComponent.htmlPosY + 220);
        let controlPointB = (endComponent.htmlPosX + 85) + ' , ' + (endComponent.htmlPosY - 100);

        let key = startComponent?.Id || '' + endComponent?.Id || '';
        return <svg
          key={key}
          viewBox="0 0 1920 1000"
          className='arrow'
        >
          <path d={`
        M ${ arrowStart}
        C ${controlPointA} ${controlPointB} ${arrowEnd}
      `}
            fill='none'
            stroke='hotpink'
            strokeWidth={5}
          />
        </svg>
      })}

    </div >
  </div>
}