import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./css/style.css"
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


export default function OWPage() {

    const navigate = useNavigate();
    const navigateCtrl = () => {
        navigate('/control');
    };

    const getStatusCell = (status) => {
        if (status.id == 1)
            return (<>
                <z className="text-ok">{status.abbreviation}</z>
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

    const [apparatuses, setApparatuses] = useState('')
    const getApparatuses = () => {
        try 
        {
            fetch('http://192.168.56.104:8000/apparatuses')
            .then((res) => res.json())
            .then((data) => {
            // console.log('data', data);
            // console.log('typeof(data):', typeof(data));
            setApparatuses(data);
         })
        }
        catch(error)
        {
            console.log(error);
        };
    };

    const appRows = () => {
        let ans = []
        for (const i in apparatuses) {
            ans.push(<tr key={apparatuses[i].id}>
                        <td key='ap'>{apparatuses[i].apparatus}</td>
                        <td key='st'>{getStatusCell(apparatuses[i].status)}</td>
                    </tr>)
        }
        return ans
    }


    const [apparatus, setApparatus] = useState('')
    const getApparatus = () => {
        try 
        {
            fetch('http://192.168.56.104:8000/apparatus/3')
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
    const apInfo = () => {
        let ans = []
        for (const i in apparatus) {
            ans.push(<div key={apparatus[i].id} className="mx-2">
                        <p>
                            <b>{apparatus[i].apparatus} </b>
                            ({getStatusCell(apparatus[i].status)})
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
            // console.log('data', data);
            // console.log('typeof(data):', typeof(data));
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
                <td key='par'>{sensors[i].parameter}</td>
                <td key='cur'>{sensors[i].current}</td>
            </tr>)
        }
        return ans
    }


    const getGavno = () => {
        try 
        {
            fetch('http://192.168.56.104:8000/apparatuses')
            .then((res) => res.json())
            .then((data) => {
            // console.log('data', data);
            // console.log('typeof(data):', typeof(data));
            setApparatuses(data);
         })
        }
        catch(error)
        {
            console.log(error);
        };
        console.log('TYPE APPARATUSES:', typeof(apparatuses))
        console.log('TYPE APPARATUSES[0]:', typeof(apparatuses[0]))
    }
    
    useEffect(() => {
        getApparatuses()
        getApparatus()
        getSensors()
    }, []);
    return (
        <>
           <div className="container justify-content-around">
                <h1 className="my-4">
                    <b>Панель просмотра</b>
                </h1>
                <div className="d-flex">
                    <div className="flex-column col-md-6 border border-dark px-4 py-2">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>
                                    Установка
                                </th>
                                <th>
                                    Статус
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            { appRows() }
                        </tbody>
                    </table>
                    </div>
                    <div className="flex-column col-md-6 border border-dark mx-3 px-4 py-2">
                        {apInfo()}
                        <Button variant="outline-primary" className="btn-lg mb-1" onClick={navigateCtrl}>
                            Управление
                        </Button>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Параметр</th>
                                    <th scope="col">Значение</th>
                                </tr>
                            </thead>
                            <tbody>
                                {senInfo()}
                            </tbody>
                        </table>
                    </div>
                </div>
           </div>
        </>
    );
}