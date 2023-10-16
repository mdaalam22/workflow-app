import React from 'react'
import { Graph } from '@antv/x6'
import { Stencil } from '@antv/x6-plugin-stencil'
import Start from "./shapes/Start";
import End from "./shapes/End";
import State from "./shapes/State";
import { graphToStateJson } from "./utility/jsonConversion";
import stencilData from "./config/states.json"
import { loadDataFromServer } from './utility/dataService';
import './App.css'


export default class App extends React.Component {
  graph
  container
  stencilContainer
  
  state = {
    isLoading: false, // Initialize isLoading to false
  };

  async componentDidMount() {
    this.graph = new Graph({
      container: this.container,
      grid: true,
      connecting: {
        connectionPoint: {
          name: 'boundary',
        },
        allowBlank: false,
        connector: 'smooth'
      }
    });

    this.graph.on("node:mouseenter", ({node}) => {
      node.addTools({
        name: 'button-remove',
        args: {
          offset: {x: 10, y: 10}
        }
      })
    })
    
    this.graph.on("node:mouseleave", ({node})=> {
      node.removeTools();
    })
    
    this.graph.on("edge:mouseenter", ({edge}) => {
      edge.addTools({
        name: "button-remove"
      })
    })
    
    this.graph.on("edge:mouseleave", ({edge})=>{
      edge.removeTools();
    })
    
    this.graph.on('edge:mouseenter', ({ edge }) => {
      edge.addTools({
        name: 'vertices'
      })
    })

    const stencil = new Stencil({
      title: "Stencil",
      target: this.graph,
      stencilGraphHeight: 420,
      stencilGraphWidth: 400,
      collapsable: true,
      groups: [{
            name: "state",
            title: "States"
          }]
    });

    this.stencilContainer.appendChild(stencil.container)

    const { states } = stencilData;

    const stencilItems = states.map((state) => {
      const { label, data } = state;
      return new State({ label, data });
    });
    
    stencil.load([
      new Start({label: "START", data: {type: "START"}}),
      new End({label: "END", data: {type: "END"}})
    ].concat(stencilItems), "state");

    this.loadGraphFromServer()
  }

  refContainer = (container) => {
    this.container = container
  }

  refStencil = (container) => {
    this.stencilContainer = container
  }

  saveState = () => {
    this.setState({ isLoading: true });
  
    const graphJson = this.graph.toJSON();
    console.log(graphJson);
  
    try {
      const stateJson = graphToStateJson(graphJson);
      setTimeout(() => {
        this.setState({ isLoading: false });
        this.showSuccess('States saved successfully.');
      }, 3000);
      console.log(stateJson)
    } catch (error) {
      this.setState({ isLoading: false });
      this.showError(error.message);
    }
  };

  showError(message) {
    alert(`Error: ${message}`);
  }
  
  showSuccess(message) {
    alert(`Success: ${message}`);
  }

  loadGraphFromServer = async () => {
    const graphData = await loadDataFromServer()
    this.graph.fromJSON(graphData);
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <div className="app">
          <div className="app-stencil" ref={this.refStencil} />
          <div className="app-content" ref={this.refContainer}></div>
        </div>
        <div className="app-footer">
          <button
            className={`save-button ${isLoading ? 'loading-button' : ''}`}
            onClick={() => this.saveState()}
            disabled={isLoading}
          >
          {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    );
  }
  
  
}

