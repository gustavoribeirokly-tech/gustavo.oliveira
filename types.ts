
import * as d3 from 'd3';

export interface MindMapNode {
  name: string;
  children?: MindMapNode[];
  _children?: MindMapNode[]; // Used for toggling
  value?: string;
  id?: string;
}

// Fixed HierarchyNode definition to include D3 layout properties and custom toggling state.
// We explicitly define the hierarchy properties to avoid inheritance issues with D3 types in different environments.
export interface HierarchyNode {
  data: MindMapNode;
  readonly depth: number;
  readonly height: number;
  parent: HierarchyNode | null;
  children?: HierarchyNode[];
  _children?: HierarchyNode[];
  x: number;
  y: number;
  x0?: number;
  y0?: number;
  id?: string;
  descendants(): HierarchyNode[];
  links(): Array<d3.HierarchyLink<MindMapNode>>;
  eachBefore(callback: (node: HierarchyNode) => void): void;
}
