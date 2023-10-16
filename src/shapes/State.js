import { Shape } from "@antv/x6";

class State extends Shape.Rect {
    constructor(metadata) {
        super({...{
            width: 110,
            height: 55,
            attrs: {
                body: {
                    fill: "#cfe1d2",
                    stroke: "#a7c8e7",
                    strokeWidth: 2,
                    rx: 10,
                    ry: 10
                }
            },
            ports: {
              groups: {
                left: {
                  position: {name: "left"},
                  attrs: {
                    circle: {
                      r: 4,
                      magnet: "passive"
                    },
                  }
                },
                right: {
                  position: {name: "right"},
                  attrs: {
                    circle: {
                      r: 4,
                      magnet: true
                    },
                  }
                },
                top: {
                  position: {name: "top"},
                  attrs: {
                    circle: {
                      r: 4,
                      magnet: true
                    },
                  }
                },
                bottom: {
                  position: {name: "bottom"},
                  attrs: {
                    circle: {
                      r: 4,
                      magnet: true
                    },
                  }
                }
              },
              items: [
                {
                  id: "port-1",
                  group: "left"
                },
                {
                  id: "port-2",
                  group: "right"
                },
                {
                  id: "port-3",
                  group: "top"
                },
                {
                  id: "port-4",
                  group: "bottom"
                },
  
              ]
            }
        }, ...metadata});
    }
  }

export default State;