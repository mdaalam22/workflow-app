import { encodeJSON } from "./dataConversion"

function graphToStateJson(inputJson) {
    if (!inputJson || !inputJson.cells || !Array.isArray(inputJson.cells)) {
      return JSON.stringify({});
    }

    const nodes = [];
    const edges = [];
  
    inputJson.cells.forEach((element) => {
      if (element.shape === "circle" || element.shape === "rect") {
        nodes.push({ id: element.id, type: element.data.type });
      } else {
        edges.push({ source: element.source.cell, target: element.target.cell });
      }
    });
  
    if (nodes.length === 0 || edges.length === 0) {
      throw new Error("Does not contain valid nodes or edges.");
    }
  
    function findStartNode() {
      const startNode = nodes.find((node) => node.type === "START");
      if (!startNode) {
        throw new Error("Start node not found.");
      }
      const startEdge = edges.find((edge) => edge.source === startNode.id);
      if (!startEdge) {
        throw new Error("Start edge not found.");
      }
      return nodes.find((node) => node.id === startEdge.target).type;
    }
  
    function findStopNodes() {
      const endNode = nodes.find((node) => node.type === "END");
      if (!endNode) {
        throw new Error("End node not found.");
      }
      const stopEdges = edges.filter((edge) => edge.target === endNode.id);
      const stopNodeTypes = stopEdges.map((stopEdge) =>
        nodes.find((node) => node.id === stopEdge.source).type
      );
      return stopNodeTypes;
    }
  
    function findPossibleTransitions(node) {
      const currentNode = node.id;
      const possibleTargets = edges
        .filter((edge) => edge.source === currentNode)
        .map((edge) => edge.target);
      const possibleTransitions = possibleTargets
        .map((target) => nodes.find((node) => node.id === target).type)
        .filter((type) => type !== "END" && type !== "START");
      return possibleTransitions;
    }
  
    function buildTransitions() {
      const stateNodes = nodes.filter((node) => node.type !== "START" && node.type !== "END");
      const transitions = stateNodes.map((node) => ({
        currentState: node.type,
        possibleTransitions: findPossibleTransitions(node),
      }));
      return transitions;
    }
  
    return JSON.stringify({
      startState: findStartNode(),
      stopStates: findStopNodes(),
      transitions: buildTransitions(),
      graphData: encodeJSON(inputJson)
    });
}

export { graphToStateJson };