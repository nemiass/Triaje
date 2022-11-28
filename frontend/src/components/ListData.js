import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { getTriajes} from '../services/triajesService';

export default function ListData() {

    const {triajes} = useContext(DataContext);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nombres</th>
                        <th scope="col">Dni</th>
                        <th scope="col">Temperatura</th>
                        <th scope="col">Frecuencia cardiaca</th>
                        <th scope="col">Presion Arterial</th>
                        <th scope="col">Peso </th>
                        <th scope="col">Talla </th>
                        <th scope="col">IMC </th>
                        <th scope="col">Rango IMC </th>
                        <th scope="col">Nivel de riesgo </th>
                        <th scope="col">fecha </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        triajes.map((triaje, index) => {
                            return (<tr key={index}>
                                <td>{triaje.usuario.nombres} {triaje.usuario.apellidos}</td>
                                <td>{triaje.usuario.dni}</td>
                                <td>{triaje.temperatura}</td>
                                <td>{triaje.frecuencia_cardiaca}</td>
                                <td>{triaje.presion_arterial}</td>
                                <td>{triaje.peso}</td>
                                <td>{triaje.talla}</td>
                                <td>{triaje.imc}</td>
                                <td>{triaje.calificacion_imc}</td>
                                <td>{triaje.nivel_riesgo}</td>
                                <td>{triaje.fecha}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

