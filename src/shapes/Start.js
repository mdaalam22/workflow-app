import { Shape } from "@antv/x6";

class Start extends Shape.Circle {
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
                out: {
                  position: {name: "right"},
                  attrs: {
                    circle: {
                      magnet: true
                    },
                  }
                }
              },
              items: [
                {
                  id: "output-port",
                  group: "out"
                }
              ]
            }
        }, ...metadata});
    }
  }

export default Start;