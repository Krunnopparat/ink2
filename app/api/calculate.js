export default function handler(req, res) {
  if (req.method === 'POST') {
    const { A, B } = req.body;

    const calculateAdditions = (A, B) => {
      const totalA = Object.values(A).reduce((sum, value) => sum + value, 0);

      const requiredTotal = Object.keys(B).reduce((acc, color) => {
        acc[color] = (A[color] / (B[color] / 100));
        return acc;
      }, {});

      const T = Math.max(...Object.values(requiredTotal));

      const requiredAmounts = Object.keys(B).reduce((acc, color) => {
        acc[color] = T * (B[color] / 100);
        return acc;
      }, {});

      const additions = Object.keys(B).reduce((acc, color) => {
        acc[color] = Math.max(0, requiredAmounts[color] - (A[color] || 0));
        return acc;
      }, {});

      return additions;
    };

    const additions = calculateAdditions(A, B);

    res.status(200).json({ additions });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
