import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./css/style.css"
import Button from 'react-bootstrap/Button';
import {useNavigate, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function CtrlPage(props) {

    const server = 'http://192.168.56.104:8000'

    const getStatusCell = (status) => {
        const help = Object.values(status)
        if (help[0] == 1)
            return (<>
                <z className="text-ok">{help[1]}</z>
            </>)
        if (help[0] == 4)
            return (<>
                <b className="text-danger">{help[1]}</b>
            </>)
        if (help[0] == 2)
            return (<>
                <z>{help[1]}</z>
            </>)
        return (<>
            <b className="text-warning">{help[1]}</b>
        </>)
    }

    const navigate = useNavigate();
    const navigateOverwatch = () => {
        navigate('/');
    };
 
    const [apparatus, setApparatus] = useState({id: 0, name: '', status: {}, devices: [ {id: 0, name: '', sensors: [{}]} ]})
    const getApparatus = (e) => {
        try 
        {
            fetch(`${server}/apparatus/${e}`)
            .then((res) => res.json())
            .then((data) => {
            // console.log('data', data);
            // console.log('typeof(data):', typeof(data));
            setApparatus(data);
         })
        }
        catch(error)
        {
            console.log(error);
        };
    };


    const handleTurnOn = () => {
        fetch(`${server}/apparatus/${apparatus.id}/status/${1}`)
        .then((res) => res.json())
            .then((data) => {
            // console.log('data', data);
            // console.log('typeof(data):', typeof(data));
            setApparatus(data);
         })
    }

    const handleTurnOff = () => {
        fetch(`${server}/apparatus/${apparatus.id}/status/${2}`)
        .then((res) => res.json())
            .then((data) => {
            // console.log('data', data);
            // console.log('typeof(data):', typeof(data));
            setApparatus(data);
         })
    }

    const apInfo = () => {
        let ans = []
            ans.push(<div key=''>
                        <p>Установка: 
                            <b> {apparatus.name} </b>
                            (id={apparatus.id})
                        </p>
                        
                        <p className="pt-2">Статус: 
                            {} {getStatusCell(apparatus.status)} {}
                            (id={apparatus.status.id})
                            
                            <Button variant="success" className="mx-5" size="lg" onClick={() => {handleTurnOn()}}>Запустить</Button> 
                            <Button variant="danger" size="lg" onClick={() => {handleTurnOff()}}>Остановить</Button>
                        </p>
                        <p>{apparatus.status.meaning}</p>
                    </div>)
        return ans
    }

    const devInfo = () => {
        let ans = []
        for (const i in apparatus.devices) {
            ans.push(<div key={i} className="pt-2">
                        <p>
                            Измерительный прибор: 
                            <b> {apparatus.devices[i].name} </b>
                            (id={apparatus.devices[i].id}) 
                            </p>
                    </div>)
        }
        return ans
    }

    const senInfo = () => {
        let ans = []
        for (const i in apparatus.devices)
            for (const j in apparatus.devices[i].sensors){
                ans.push(<tr key={j}>
                    <td key='sen'>{apparatus.devices[i].sensors[j].name}</td>
                    <td key='par'>{apparatus.devices[i].sensors[j].parameter}</td>
                    <td key='cur'>{apparatus.devices[i].sensors[j].current}</td>
                    <td key='ran'>[ {apparatus.devices[i].sensors[j].lower} ; {apparatus.devices[i].sensors[j].upper} ]</td>
                </tr>)
        }
        return ans
    }

    const location = useLocation()
    useEffect(() => {
        const ap = location.state.name.id
        // getApparatus(ap)
        // console.log('LOCATION', ap)
        // getDevices(ap)
        // getSensors(d)
        getApparatus(ap)
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