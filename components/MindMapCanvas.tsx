
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { mindMapData } from '../data';
import { MindMapNode, HierarchyNode } from '../types';

const MindMapCanvas: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const margin = { top: 20, right: 120, bottom: 20, left: 240 };
    
    // Increased spacing to prevent overlapping
    // dx is the vertical distance between sibling nodes
    // dy is the horizontal distance between parent and child levels
    const dx = 70; 
    const dy = 450; 

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-margin.left, -margin.top, width, height].join(' '))
      .style("font", "12px sans-serif")
      .style("user-select", "none");

    // Clear previous elements
    svg.selectAll("*").remove();

    const gLink = svg.append("g").attr("class", "links-group");
    const gNode = svg.append("g").attr("class", "nodes-group");

    // Create hierarchy and cast to our HierarchyNode
    // d3.hierarchy returns a node that we treat as our HierarchyNode interface
    const root = d3.hierarchy(mindMapData) as unknown as HierarchyNode;

    root.x0 = dy / 2;
    root.y0 = 0;

    // Initially collapse children of main categories to start with a clean view
    if (root.children) {
      root.children.forEach((child: HierarchyNode) => {
        if (child.children) {
          child._children = child.children;
          child.children = undefined;
        }
      });
    }

    const tree = d3.tree<MindMapNode>().nodeSize([dx, dy]);

    const update = (source: HierarchyNode) => {
      const duration = 250;
      
      // Compute the new tree layout.
      // We use as any here to bridge between our interface and D3's internal layout expectations
      tree(root as any);

      const nodes = root.descendants().reverse();
      const links = root.links();

      let left = root;
      let right = root;
      root.eachBefore((node: HierarchyNode) => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });

      const transition = svg.transition()
        .duration(duration) as any;

      // Update the nodes…
      const node = gNode.selectAll("g")
        .data(nodes, (d: any) => d.id || (d.id = Math.random().toString(36).substr(2, 9)));

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d: HierarchyNode) => {
          if (d.children) {
            d._children = d.children;
            d.children = undefined;
          } else {
            d.children = d._children;
            d._children = undefined;
          }
          update(d);
        });

      // Box styling - boxes have white text on teal background
      nodeEnter.append("rect")
        .attr("class", "node-rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("y", -18)
        .attr("x", 0)
        .attr("height", 36)
        .attr("width", d => {
          // Dynamic width based on text length with better bounds
          const label = d.data.name;
          return Math.min(Math.max(label.length * 8.5, 140), 420);
        })
        .attr("fill", "#008080")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 1);

      // Label styling
      nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", 12)
        .attr("text-anchor", "start")
        .attr("fill", "#ffffff")
        .style("font-weight", "500")
        .text(d => d.data.name);

      // Transition nodes to their new position.
      node.merge(nodeEnter as any).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      // Update the links…
      const link = gLink.selectAll("path")
        .data(links, (d: any) => d.target.id);

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().append("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#008080") // Match links to the theme color
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.3)
        .attr("d", d => {
          const o = { x: source.x0!, y: source.y0! };
          return d3.linkHorizontal()({ source: o, target: o } as any);
        });

      // Transition links to their new position.
      link.merge(linkEnter as any).transition(transition)
        .attr("d", d3.linkHorizontal()
          .x((d: any) => d.y)
          .y((d: any) => d.x) as any);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition(transition).remove()
        .attr("d", d => {
          const o = { x: source.x, y: source.y };
          return d3.linkHorizontal()({ source: o, target: o } as any);
        });

      // Stash the old positions for transition.
      nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };

    update(root);

    // Zooming functionality
    const zoom = d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
      svg.selectAll("g.links-group, g.nodes-group").attr("transform", event.transform);
    });

    svg.call(zoom as any);

    const initialTransform = d3.zoomIdentity.translate(80, height / 2).scale(0.75);
    svg.call(zoom.transform as any, initialTransform);

  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen bg-slate-50 relative overflow-hidden">
      <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      <div className="absolute bottom-6 left-6 bg-white/90 p-4 rounded-xl border border-slate-200 shadow-lg backdrop-blur-md">
        <h3 className="text-xs font-bold text-teal-800 uppercase tracking-widest mb-3 border-b border-teal-100 pb-2">Controles de Navegação</h3>
        <ul className="text-xs space-y-2 text-slate-600">
          <li className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-teal-600 mr-3"></span> Clique para expandir/recolher níveis</li>
          <li className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-teal-600 mr-3"></span> Arraste o fundo para mover o mapa</li>
          <li className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-teal-600 mr-3"></span> Role para aumentar ou diminuir zoom</li>
        </ul>
      </div>
    </div>
  );
};

export default MindMapCanvas;
