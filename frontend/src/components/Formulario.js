import React, { useContext, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { DataContext } from '../context/DataContext';
import { getTriajes, postTriaje } from '../services/triajesService';

const initForm = {
    "nombres": "",
    "apellidos": "",
    "dni": "",
    "temperatura": "",
    "frecuencia_cardiaca": "",
    "presion_arterial": "",
    "peso": "",
    "talla": "",
    "nivel_riesgo": ""
}

export default function Formulario() {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [data, setData] = useState(initForm);

    const [option, setOption] = useState({ "op": "" });
    
    const {setTriajes} = useContext(DataContext);

    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }

    const handleFocus = (e) => {
        const { name, value } = e.target;
        e.target.style.background = 'pink';
        setOption({ "op": name });
    }

    const handleBlur = (e) => {
        e.target.style.background = 'white';
        resetTranscript();
    }

    const handleVoice = (_) => {
        if (option.op == "") {
            return SpeechRecognition.stopListening();
        }
        SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
    }

    const handleStop = (_) => {
        SpeechRecognition.stopListening();
        setData({ ...data, [option.op]: transcript });
        resetTranscript();
    }

    const sendData = (e) => {
        e.preventDefault();
        sendTriaje()
        setData({ ...initForm })
    }

    async function sendTriaje() {
        const response = await postTriaje(data);
        const d = await getTriajes()
        console.log(response)
        setTriajes(d)
    }

    return (
        <div>
            <form method='post'>
                <h1 className="text-center">Registro Triaje</h1>
                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
                    <input type="text" name="nombres" className="form-control"
                        value={data.nombres}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Apellidos</label>
                    <input type="text" name="apellidos" className="form-control"
                        value={data.apellidos}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Dni</label>
                    <input type="text" name="dni" className="form-control"
                        value={data.dni}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Temperatura</label>
                    <input type="text" name="temperatura" className="form-control"
                        value={data.temperatura}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Frecuencia Cardiaca</label>
                    <input type="text" name="frecuencia_cardiaca" className="form-control"
                        value={data.frecuencia_cardiaca}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Presion Arterial</label>
                    <input type="text" name="presion_arterial" className="form-control"
                        value={data.presion_arterial}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">peso</label>
                    <input type="text" name="peso" className="form-control"
                        value={data.peso}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">talla</label>
                    <input type="text" name="talla" className="form-control"
                        value={data.talla}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div className="mb-1">
                    <label htmlFor="exampleInputEmail1" className="form-label">Nivel Riesgo</label>
                    <input type="text" name="nivel_riesgo" className="form-control"
                        value={data.nivel_riesgo}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>


                <button type="submit" className="btn btn-primary" onClick={sendData}>Submit</button>
            </form>

            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={handleVoice}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p className='alert alert-success'>{transcript}</p>
        </div>
    );
}

