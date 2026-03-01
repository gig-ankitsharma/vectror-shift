// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            const payload = {
                nodes: nodes.map(({ id }) => ({ id })),
                edges: edges.map(({ source, target }) => ({ source, target })),
            };

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                alert('Error: Failed to reach the backend.');
                return;
            }

            const { num_nodes, num_edges, is_dag } = await response.json();
            alert(
                `Pipeline Analysis\n` +
                `─────────────────\n` +
                `Nodes:  ${num_nodes}\n` +
                `Edges:  ${num_edges}\n` +
                `Is DAG: ${is_dag ? 'Yes' : 'No'}`
            );
        } catch (err) {
            alert('Error: Could not connect to the backend. Make sure it is running on port 8000.');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
    );
};
