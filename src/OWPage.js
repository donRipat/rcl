import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./css/style.css"
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';


export default function OWPage() {

    const server = 'http://192.168.56.104:8000'
    const navigate = useNavigate();
    const navigateCtrl = (id) => {
        navigate('/control', {state:{id:1,name:{id}}});
    };

    useEffect(() => {
        getApparatuses()
        handleApparatusClick(apparatuses[0])
        let interval = setInterval(() => {
            getApparatuses()
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const [apparatuses, setApparatuses] = useState([{id: 0, name: '', status: {}, devices: []}])
    const getApparatuses = () => {
        try 
        {
            fetch(`${server}/apparatuses`)
            .then(res => res.json())
            .then(data => {setApparatuses(data);})
        }
        catch(error)
        {
            console.log(error);
        };
    }

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

    const appRows = () => {
        let ans = []
        for (const i in apparatuses) {
            ans.push(<div className="d-grid gap-2">
                        <Button className="ap-row px-2 p-1" onClick={() => (handleApparatusClick(apparatuses[i]))}>
                            <div className="d-flex">
                                <z className="col-md-9">{apparatuses[i].name}</z>
                                <z>{getStatusCell(apparatuses[i].status)}</z>
                            </div>
                        </Button>
                    </div>)
        }
        return ans
    }

    const [intr, setIntr] = useState(0)
    const handleApparatusClick = (aptus) => {
        clearInterval(intr)
        getApparatus(aptus.id)
        let inter = setInterval(() => {
            getApparatus(aptus.id)
        }, 1000)
        console.log('USE EFFECT AMPLIED')
        setIntr(inter)
    }

    const [apparatus, setApparatus] = useState({id: 0, name: '', status: {}, devices: [ {id: 0, name: '', sensors: [{}]} ]})
    const getApparatus = (e) => {
        try 
        {
            fetch(`${server}/apparatus/${e}`)
            .then((res) => res.json())
            .then((data) => {setApparatus(data)})
        }
        catch(error)
        {
            console.log(error);
        };
    };

    const apInfo = () => {
        return (<div className="mx-2">
                    <p>
                        <b>{apparatus.name} </b>
                        ({getStatusCell(apparatus.status)})
                    </p>
                </div>)
    }

    const senInfo = () => {
        let ans = []
        for (const i in apparatus.devices)
            for (const j in apparatus.devices[i].sensors)
            ans.push(<tr key={j}>
                <td key='par'>{apparatus.devices[i].sensors[j].parameter}</td>
                <td key='cur'>{apparatus.devices[i].sensors[j].current}</td>
            </tr>)
            return ans
    }

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
                                <th className="st-col">
                                    Статус
                                </th>
                            </tr>
                        </thead>
                    </table>
                    { appRows() }
                    </div>
                    <div className="flex-column col-md-6 border border-dark mx-3 px-4 py-2">
                        {apInfo()}
                        <Button variant="outline-primary" className="btn-lg mb-1" 
                        onClick={ () => (navigateCtrl(apparatus.id))}>
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