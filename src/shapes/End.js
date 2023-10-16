import { Shape } from "@antv/x6";

class End extends Shape.Circle {
    constructor(metadata) {
        super({...{
            width: 75,
            height: 75,
            attrs: {
                body: {
                    fill: "#cfe1f2",
                    stroke: "#a7c8e7",
                    strokeWidth: 2,
                    rx: 10,
                    ry: 10
                }
            },
            ports: {
              groups: {
                in: {
                  position: {name: "left"},
                  attrs: {
                    circle: {
                      magnet: true
                    },
                  }
                }
              },
              items: [
                {
                  id: "input-port-4",
                  group: "in"
                }
              ]
            }
        }, ...metadata});
    }
  }

export default End;