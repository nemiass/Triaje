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
    const triajes = useContext(DataContext);
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
        async function postData() {
            const res = await postTriaje(data);
            console.log(res);
            updateTriajes();
        }
        postData()
        setData({ ...initForm })
        
    }

    async function updateTriajes() {
        const d = await getTriajes()
        console.log("data", d)
        triajes.setListDatas(d);
    }

    return (
        <div>
            <form method='post'>
                <h1 class="text-center">Registro Triaje</h1>
                <div class="mb-1">
                    <label for="exampleInputEmail1" class="form-label">Nombre</label>
                    <input type="text" name="nombres" class="form-control"
                        value={data.nombres}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div class="mb-1">
                    <label for="exampleInputEmail1" class="form-label">Apellidos</label>
                    <input type="text" name="apellidos" class="form-control"
                        value={data.apellidos}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div class="mb-1">
                    <label for="exampleInputEmail1" class="form-label">Dni</label>
                    <input type="text" name="dni" class="form-control"
                        value={data.dni}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div class="mb-1">
                    <label for="exampleInputEmail1" class="form-label">Temperatura</label>
                    <input type="text" name="temperatura" class="form-control"
                        value={data.temperatura}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div class="mb-1">
                    <label for="exampleInputEmail1" class="form-label">Frecuencia Cardiaca</label>
                    <input type="text" name="frecuencia_cardiaca" class="form-control"
                        value={data.frecuencia_cardiaca}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div class="mb-1">
                    <label for="exampleInputEmail1" class="form-label">Presion Arterial</label>
                    <input type="text" name="presion_arterial" class="form-control"
                        value={data.presion_arterial}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div class="mb-1">
                    <label for="exampleInputEmail1" class="form-label">peso</label>
                    <input type="text" name="peso" class="form-control"
                        value={data.peso}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div class="mb-1">
                    <label for="exampleInputEmail1" class="form-label">talla</label>
                    <input type="text" name="talla" class="form-control"
                        value={data.talla}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>

                <div class="mb-1">
                    <label for="exampleInputEmail1" class="form-label">Nivel Riesgo</label>
                    <input type="text" name="nivel_riesgo" class="form-control"
                        value={data.nivel_riesgo}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>


                <button type="submit" class="btn btn-primary" onClick={sendData}>Submit</button>
            </form>

            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={handleVoice}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p className='alert alert-success'>{transcript}</p>
        </div>
    );
}

