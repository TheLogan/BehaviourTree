import React, { useState } from "react";
import { Action, Addition, Log, } from "../behaviour/Components/Actions";
import { Composite, ParallelSequence, Sequence, Selector } from "../behaviour/Components/Composite";
import { Decorator, Invert } from "../behaviour/Components/Decorator";
import { Button, Menu, MenuItem, Grid, withStyles } from "@material-ui/core";

interface IProp {
  isPlaying: boolean;
  addRoot: () => void;
  addAction: (comp: Action) => void;
  addComposite: (comp: Composite) => void;
  addDecorator: (comp: Decorator) => void;
  togglePlaying: () => void;
}

export function CanvasHeader(props: IProp) {
  const [actionMenu, setActionMenu] = useState(false);
  const [compositeMenu, setCompositeMenu] = useState(false);
  const [decoratorMenu, setDecoratorMenu] = useState(false);
  const [activeElem, setActiveElem] = useState<HTMLButtonElement | null>(null);


  return <Grid container spacing={2} alignItems="flex-end">
    <Grid item xs={3}>
      <h1>Behaviour</h1>
    </Grid>
    <Grid item xs={9}>
      <Grid container spacing={2} direction='column' justify="flex-end">
        <Grid item></Grid>
        <Grid item xs={8}>
          <Button id="playButton" className={props.isPlaying ? 'active' : ''} onClick={props.togglePlaying}><i className="fas fa-play"></i></Button>
        </Grid>
        <Grid item xs={8}>
          <Button onClick={() => { props.addRoot() }}>Add root</Button>
          <Button onClick={(e) => { setActionMenu(true); setActiveElem(e.currentTarget) }}>Add Action</Button>
          <Button onClick={(e) => { setCompositeMenu(true); setActiveElem(e.currentTarget) }}>Add Composite</Button>
          <Button onClick={(e) => { setDecoratorMenu(true); setActiveElem(e.currentTarget) }}>Add Decorator</Button>
        </Grid>
      </Grid>
    </Grid>




    <Menu open={actionMenu} onClose={() => { setActionMenu(false) }} anchorEl={activeElem} anchorOrigin={{ vertical: "top", horizontal: "left" }} >
      <MenuItem onClick={() => { props.addAction(new Log('Log')); setActionMenu(false) }}>Log</MenuItem>
      <MenuItem onClick={() => { props.addAction(new Addition('Addition')); setActionMenu(false) }}>Addition</MenuItem>
    </Menu>

    <Menu open={compositeMenu} onClose={() => { setCompositeMenu(false) }} anchorEl={activeElem}>
      <MenuItem onClick={() => { props.addComposite(new ParallelSequence('ParallelSequence')); setCompositeMenu(false) }}>ParallelSequence</MenuItem>
      <MenuItem onClick={() => { props.addComposite(new Sequence('Sequence')); setCompositeMenu(false) }}>Sequence</MenuItem>
      <MenuItem onClick={() => { props.addComposite(new Selector('Selector')); setCompositeMenu(false) }}>Selector</MenuItem>
    </Menu>
    <Menu open={decoratorMenu} onClose={() => { setDecoratorMenu(false) }} anchorEl={activeElem}>
      <MenuItem onClick={() => { props.addDecorator(new Invert('Invert')); setCompositeMenu(false) }}>Invert</MenuItem>
    </Menu>
  </Grid >;
}



const theme = {
  palette: {
    type: "dark"
  }
};

export default withStyles(theme)(CanvasHeader)