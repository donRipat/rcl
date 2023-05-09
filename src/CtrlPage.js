import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./css/style.css"
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CtrlPage() {

    const getStatusCell = (status) => {
        if (status.id == 1)
            return (<>
                <qwerty className="text-ok">{status.abbreviation}</qwerty>
            </>)
        if (status.id == 4)
            return (<>
                <b className="text-danger">{status.abbreviation}</b>
            </>)
        if (status.id == 2)
            return (<>
                <>{status.abbreviation}</>
            </>)
        return (<>
            <b className="text-warning">{status.abbreviation}</b>
        </>)
    }

    const navigate = useNavigate();
    const navigateOverwatch = () => {
        navigate('/overwatch');
    };

    const [apparatus, setApparatus] = useState('')
    const getApparatus = () => {
        try 
        {
            fetch('http://192.168.56.104:8000/apparatus/1')
            .then((res) => res.json())
            .then((data) => {
            console.log('data', data);
            console.log('typeof(data):', typeof(data));
            setApparatus(data);
         })
        }
        catch(error)
        {
            console.log(error);
        };
    };
    const apInfo = () => {
        let ans = []
        for (const i in apparatus) {
            ans.push(<div key=''>
                        <p>Установка: 
                            <b> {apparatus[i].apparatus} </b>
                            (id={apparatus[i].id})
                        </p>
                        
                        <p className="pt-2">Статус: 
                            {} {getStatusCell(apparatus[i].status)} {}
                            (id={apparatus[i].status.id})
                            
                            <Button variant="success" className="mx-5" size="lg" disabled>Запустить</Button> 
                            <Button variant="danger" size="lg">Остановить</Button>
                        </p>
                        <p>{apparatus[i].status.meaning}</p>
                    </div>)
        }
        return ans
    }


    const [devices, setDevices] = useState('')
    const getDevices = () => {
        try 
        {
            fetch('http://192.168.56.104:8000/devices/1')
            .then((res) => res.json())
            .then((data) => {
            console.log('data', data);
            console.log('typeof(data):', typeof(data));
            setDevices(data);
         })
        }
        catch(error)
        {
            console.log(error);
        };
    };
    const devInfo = () => {
        let ans = []
        for (const i in devices) {
            ans.push(<div key={i} className="pt-2">
                        <p>
                            Измерительный прибор: 
                            <b> {devices[i].device} </b>
                            (id={devices[i].id}) 
                            </p>
                    </div>)
        }
        return ans
    }

    const [sensors, setSensors] = useState('')
    const getSensors = () => {
        try 
        {
            fetch('http://192.168.56.104:8000/sensors/1')
            .then((res) => res.json())
            .then((data) => {
            console.log('data', data);
            console.log('typeof(data):', typeof(data));
            setSensors(data);
         })
        }
        catch(error)
        {
            console.log(error);
        };
    };
    const senInfo = () => {
        let ans = []
        for (const i in sensors) {
            ans.push(<tr key={sensors[i].id}>
                <td key='sen'>{sensors[i].sensor}</td>
                <td key='par'>{sensors[i].parameter}</td>
                <td key='cur'>{sensors[i].current}</td>
                <td key='ran'>[ {sensors[i].lower} ; {sensors[i].upper} ]</td>
            </tr>)
        }
        return ans
    }


    useEffect(() => {
        getApparatus()
        getDevices()
        getSensors()
    }, []);
    return (
        <>
            <div className="">
                <div className="container flex-column">
                    <h1 className="my-4"><b>Панель управления</b></h1>
                    <Button variant="outline-primary" className="mb-4 btn-lg" onClick={navigateOverwatch}>
                        Вернуться к установкам
                    </Button>
                    { apInfo() }
                    {devInfo()}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Датчик</th>
                                <th scope="col">Параметр</th>
                                <th scope="col">Значение</th>
                                <th scope="col">Рабочий диапазон</th>
                            </tr>
                        </thead>
                        <tbody>
                            {senInfo()}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}