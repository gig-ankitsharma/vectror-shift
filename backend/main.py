from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    nodes: List[Any] = []
    edges: List[Any] = []


def is_dag(nodes: list, edges: list) -> bool:
    node_ids = {n["id"] for n in nodes}
    adj = {node_id: [] for node_id in node_ids}
    for edge in edges:
        src, tgt = edge.get("source"), edge.get("target")
        if src in adj:
            adj[src].append(tgt)

    visited = set()
    rec_stack = set()

    def has_cycle(node):
        visited.add(node)
        rec_stack.add(node)
        for neighbor in adj.get(node, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
        rec_stack.remove(node)
        return False

    for node_id in node_ids:
        if node_id not in visited:
            if has_cycle(node_id):
                return False
    return True


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges
    return {
        'num_nodes': len(nodes),
        'num_edges': len(edges),
        'is_dag': is_dag(nodes, edges),
    }
