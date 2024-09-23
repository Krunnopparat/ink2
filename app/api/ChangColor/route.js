
export async function POST(request) {
    const keypassword = request.headers.get('keypassword');
    const expectedKey = 'N0pp@r@t.04';

    if (keypassword !== expectedKey) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const { A, B } = await request.json();

    const calculateAdditions = (A, B) => {
        let maxRatio = 0;
        const requiredAmounts = {};
        const additions = {};

        for (const color in B) {
            const aValue = A[color] || 0;
            const bValue = B[color];
            const ratio = aValue / (bValue / 100);
            maxRatio = Math.max(maxRatio, ratio);
        }

        for (const color in B) {
            const bValue = B[color];
            requiredAmounts[color] = maxRatio * (bValue / 100);
        }

        for (const color in B) {
            const aValue = A[color] || 0;
            additions[color] = parseFloat(Math.max(0, requiredAmounts[color] - aValue).toFixed(2));
        }

        return additions;
    };

    const additions = calculateAdditions(A, B);

    return new Response(JSON.stringify({ additions }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
