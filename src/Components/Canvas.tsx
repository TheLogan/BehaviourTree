import React, { useState } from "react";
import { Component } from "../behaviour/Components/Component";
import { Engine } from "../behaviour/Engine";
import { Root } from "../behaviour/Components/Root";
import Draggable, { DraggableData } from "react-draggable";

import './Canvas.css';
import CanvasHeader from "./CanvasHeader";
import { Action } from "../behaviour/Components/Actions";
import { Composite } from "../behaviour/Components/Composite";
import { Decorator } from "../behaviour/Components/Decorator";
import { Card, Grid, withStyles } from "@material-ui/core";
import { CanvasHelper } from "./CanvasHelper";
import { Arrow } from "../Models/Arrow";
import { ArrowPart } from "../Models/ArrowPart";

interface IProps { engine: Engine }
function Canvas(props: IProps) {
  const [components, setComponents] = useState<Component[]>([]);
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [arrowPart, setArrowPart] = useState<null | ArrowPart>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const setRerender = useState(0)[1];

  let canvasHelper = new CanvasHelper();


  function addRoot() {
    if (props.engine.root != null) return;
    props.engine.root = new Root('root');

    setComponents([...components, props.engine.root]);
  }

  function addAction(action: Action) {
    setComponents([...components, action])
  }

  function addComposite(composite: Composite) {
    setComponents([...components, composite])
  }

  function addDecorator(decorator: Decorator) {
    setComponents([...components, decorator])
  }



  function compDragged(pos: DraggableData, compId: string) {
    let component = components.find(x => x.Id === compId);
    if (!component) return;
    component.htmlPosX = pos.x;
    component.htmlPosY = pos.y;
    setRerender(Math.random());
  }

  function toggleLogic() {
    console.log('running logic');
    if (isPlaying === true) {
      props.engine.stop();
      setIsPlaying(false);
    } else {
      console.log('props.engine', props.engine);
      props.engine.start();
      setIsPlaying(true);
    }
  }


  return <Grid container>
    <CanvasHeader
      isPlaying={isPlaying}
      togglePlaying={toggleLogic}
      addRoot={addRoot}
      addAction={addAction}
      addComposite={addComposite}
      addDecorator={addDecorator}
    />

    <Grid container id='canvas'>

      <Grid item >
        {
          components.map(comp => {
            let anchorTopClass = 'anchorTop no-cursor';
            let anchorBottomClass = 'anchorBottom no-cursor';
            if (arrowPart?.compId === comp.Id) {
              if (arrowPart.type === 'top') anchorBottomClass += ' active';
              else anchorTopClass += ' active';
            }

            let myDiv = <Draggable key={comp.Id} cancel='.no-cursor' onDrag={(e, pos) => compDragged(pos, comp.Id)}>
              <Card className='compCard'>
                {comp !== props.engine.root &&
                  <div onClick={_ => canvasHelper.setArrowEnd(comp.Id, components, arrowPart, arrows, setArrowPart, setArrows)} className={anchorTopClass}></div>
                }
                <div className='compCardLabel'>{comp.label}</div>
                <div onClick={_ => canvasHelper.setArrowStart(comp.Id, components, arrowPart, arrows, setArrowPart, setArrows)} className={anchorBottomClass}></div>
              </Card>
            </Draggable>
            return myDiv;
          })
        }
      </Grid>

      <svg
        viewBox="0 0 1920 1000"
        className='arrow'
      >
        {arrows.map(arrow => {
          let startComponent = components.find(x => x.Id === arrow.startId);
          let endComponent = components.find(x => x.Id === arrow.endId);
          if (!startComponent || !endComponent) {
            console.log('start or end of arrow missing');
            return null;
          }
          let arrowStart = (startComponent.htmlPosX + 85) + ' , ' + (startComponent.htmlPosY + 120);
          let arrowEnd = (endComponent.htmlPosX + 85) + ' , ' + (endComponent.htmlPosY);

          let controlPointA = (startComponent.htmlPosX + 85) + ' , ' + (startComponent.htmlPosY + 220);
          let controlPointB = (endComponent.htmlPosX + 85) + ' , ' + (endComponent.htmlPosY - 100);

          let key = startComponent?.Id || '' + endComponent?.Id || '';
          return <path key={key}
            d={`
              M ${ arrowStart}
              C ${controlPointA} ${controlPointB} ${arrowEnd}
            `}
            fill='none'
            stroke='hotpink'
            strokeWidth={5}
          />
        })}
      </svg>

    </Grid >
  </Grid>
}

const theme = {
  palette: {
    type: "dark"
  }
};

export default withStyles(theme)(Canvas)