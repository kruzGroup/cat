// components/pages/solvencies/solvencies.tsx
import axios from 'axios';
import React from 'react';

const Solvencies = () => {
    const [solvencies, setSolvencies] = React.useState([]);

    React.useEffect(() => {
        axios.get('/api/solvencies') // Ajusta la ruta según tu API
            .then(response => setSolvencies(response.data));
    }, []);

    const handleDownloadPdf = (id: number) => {
        window.open(`/solvencies/${id}/pdf`, '_blank');
    };

    return (
        <div>
            <h1>Listado de Solvencias</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {solvencies.map((solvency) => (
                        <tr key={solvency.id}>
                            <td>{solvency.id}</td>
                            <td>{solvency.user.name}</td>
                            <td>
                                <button onClick={() => handleDownloadPdf(solvency.id)}>
                                    Descargar PDF
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Solvencies;