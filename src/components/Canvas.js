  
import React from 'react';
import '../css/canvas.css';
import { Stage } from '@inlet/react-pixi';
import Shape from "./Shape";

class Canvas extends React.Component {
  shapes = [];

  constructor() {
    super();
    this.gravity = 20;
    this.stage = React.createRef();
    this.state = {
      nShapes: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.stage.current.app.stage.children?.forEach(e => {
        if(e.parent) {
          e.containerUpdateTransform();
        }

        if(e.children.length === 0) {
          this.stage.current.app.stage.removeChild(e);
        }

        if(e.getBounds().y < 480) {
          e.y += this.gravity;
        } else {
          e.destroy();
          this.stage.current.app.stage.removeChild(e);
        }
      })
      
      const g = new Shape();
      this.stage.current.app.stage.addChild(g);
      this.setState({
        nShapes: this.stage.current.app.stage.children.length
      })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  createNewShape = (e) => {
    const g = new Shape(e.nativeEvent.offsetX-20, e.nativeEvent.offsetY-20);
    this.stage.current.app.stage.addChild(g);
    this.setState({
      nShapes: this.stage.current.app.stage.children.length
    })
  }

  render() {
    const shapesNumber = this.state.nShapes;
    const area = 40*40*shapesNumber;

    return(
      <div className="canvas">
        <div className="canvas__table">
          <span className="canvas__cell">Numar forme: {shapesNumber}</span>
          <span className="canvas__cell">Suprafata ocupata: {area} </span>
        </div>
        <Stage
          ref={this.stage} 
          width={800} height={500} 
          options={{ backgroundColor: 0xffffff, antialias: true } }
          onClick={e => this.createNewShape(e)}>
        </Stage>
      </div>
    );
  }
}

export default Canvas