'use client'

import { useState, useEffect } from 'react';

export default function FormulaComponents({ fcId }) {
    const [components, setComponents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFormulaComponents = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/formula_components?FC_ID=${fcId}&page=${page}&limit=10`);
                const data = await response.json();
                setComponents(data.data);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching formula components:', error);
            }
            setLoading(false);
        };

        fetchFormulaComponents();
    }, [fcId, page]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div>
            <h2>Formula Components</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {components.map((component, index) => (
                        <li key={index}>
                            {component.some_field}
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}
