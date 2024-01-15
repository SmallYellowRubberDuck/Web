import "./index.scoped.css";
import AppContainer from "../../AppContainer";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Graph from "../Graph";
import store from "../../../store";
import { Slider } from 'primereact/slider';
import {useNavigate} from "react-router-dom";

function Input() {
    useEffect(() => {
        if (store.getState().login.value == null || store.getState().password.value == null){
            navigate("/");
        }
        else{
            sendShowRequest();
        }
    }, []);

    function popupMessage(message){
        toast(message, {
            style: {
                borderRadius: '10px',
                color: 'rgb(4, 30, 55)',
                background: 'rgb(255, 255, 255, 50%)'
            }
        })
    }
    const [xValue, setX] = useState("-5");
    const [yValue, setY] = useState("0");
    const [rValue, setR] = useState("2");
    const [dotData, setDotData] = useState([]);

    const navigate = useNavigate();

    const NEGATIVE_R_ERROR = "Radius can't be less than 1!";
    const INVALID_Y_ERROR = "Y is out of range!";

    const selectX = (e) => {
        setX(parseInt(e.target.value));
    }
    const selectY = (e) => {
        if (validateY(e.target.value)){
            setY(e.target.value);
        }
        else{
            popupMessage(INVALID_Y_ERROR);
        }
    }
    const selectR = (e) => {
        if (validateR(e.target.value)){
            setR(parseInt(e.target.value));
        }
        else{
            popupMessage(NEGATIVE_R_ERROR);
        }
    }

    function validateR(r){
        return r > 0;
    }
    function validateY(y){
        return y >= -5 && y <= 5;
    }

    function sendShowRequest(){
        (async () => {
            let response = await fetch("/api/dots", {
                method: "GET",
                headers: {"Authorization": "Basic " + btoa(store.getState().login.value + ":" + store.getState().password.value).replaceAll("=", "")}
            })
            let data = await response.json();
            if (response.ok) setDotData(data);
        })()
    }

    function sendCheckRequest(x,y,r){
        let dotFormData = new FormData();
        if (isNaN(x) || isNaN(y) || isNaN(r)) popupMessage("Choose all parameters"); else {
            dotFormData.append('x', parseFloat(x));
            dotFormData.append('y', parseFloat(y));
            dotFormData.append('r', parseFloat(r));
            (async () => {
                let response = await fetch("/api/dots", {
                    method: "POST",
                    headers: {"Authorization": "Basic " + btoa(store.getState().login.value + ":" + store.getState().password.value).replaceAll("=", "")},
                    body: dotFormData
                })
                let data = await response.json();
                if (response.ok) setDotData([...dotData, data]);
            })()
        }
    }

    function sendDeleteRequest(){
        (async () => {
            let response = await fetch("/api/dots", {
                method: "DELETE",
                headers: {"Authorization": "Basic " + btoa(store.getState().login.value + ":" + store.getState().password.value).replaceAll("=", "")}
            })
            if (response.ok) setDotData([]);
        })()
    }

    function parseNumber(number){
        if (number < 10) return ("0" + number);
        return number;
    }

    function parseCurrentTime(timeStamp){
        let dateFormat = new Date(timeStamp*1000);
        return (parseNumber(dateFormat.getDate()) + "/" + parseNumber((dateFormat.getMonth()+1)) + "/" + dateFormat.getFullYear() + " "
            + parseNumber(dateFormat.getHours()) + ":" + parseNumber(dateFormat.getMinutes()) + ":" + parseNumber(dateFormat.getSeconds()));
    }

    function parseScriptTime(scriptTime){
        return scriptTime/1000;
    }


    const handleClickChart = async (coordinate) => {
        sendCheckRequest(coordinate.x, coordinate.y, rValue)
    };

    return (
        <AppContainer>
            <div id="main-container">
                <div id="data-container">
                    <div id="X">
                        Choose X:
                        <div className="X-values">
                            <div id="X-first-row">
                                <div className="checkbox-container">
                                    <input type="checkbox" id="x-3" className="pointer checkbox" value="-3" checked={xValue === -3} onChange={selectX} />
                                    <label className="checkbox-label" htmlFor="x-3">-3</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id="x-2" className="pointer checkbox" value="-2" checked={xValue === -2} onChange={selectX} />
                                    <label className="checkbox-label" htmlFor="x-2">-2</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id="x-1" className="pointer checkbox" value="-1" checked={xValue === -1} onChange={selectX} />
                                    <label className="checkbox-label" htmlFor="x-1">-1</label>
                                </div>
                            </div>
                            <div id="X-second-row">
                                <div className="checkbox-container">
                                    <input type="checkbox" id="x0" className="pointer checkbox" value="0" checked={xValue === 0} onChange={selectX} />
                                    <label className="checkbox-label" htmlFor="x0">0</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id="x1" className="pointer checkbox" value="1" checked={xValue === 1} onChange={selectX} />
                                    <label className="checkbox-label" htmlFor="x-1">1</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id="x2" className="pointer checkbox" value="2" checked={xValue === 2} onChange={selectX} />
                                    <label className="checkbox-label" htmlFor="x2">2</label>
                                </div>
                            </div>
                            <div id="X-third-row">
                                <div className="checkbox-container">
                                    <input type="checkbox" id="x3" className="pointer checkbox" value="3" checked={xValue === 3} onChange={selectX} />
                                    <label className="checkbox-label" htmlFor="x3">3</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id="x4" className="pointer checkbox" value="4" checked={xValue === 4} onChange={selectX} />
                                    <label className="checkbox-label" htmlFor="x-5">4</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id="x5" className="pointer checkbox" value="5" checked={xValue === 5} onChange={selectX} />
                                    <label className="checkbox-label" htmlFor="x5">5</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Y">
                        Choose Y (-5; 5):
                        <br/>
                        <label style={{marginLeft: "48%"}} htmlFor={"range"}>{yValue} </label>
                        <br/>
                       <input type="range" min="-5" max="5" value={yValue} id="fader" step="1" list="ymas" onInput={selectY}/>
                        <datalist id="ymas">
                            <option>-5</option>
                            <option>-4</option>
                            <option>-3</option>
                            <option>-2</option>
                            <option>-1</option>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </datalist>

                    </div>
                    <div id="R">
                        Choose R:
                        <div className="R-values">
                            <div id="R-first-row">
                                <div className="checkbox-container">
                                    <input type="checkbox" id="r-3" className="pointer checkbox" value="-3" checked={false} onChange={selectR} />
                                    <label className="checkbox-label" htmlFor="r-3">-3</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id="r-2" className="pointer checkbox" value="-2" checked={false} onChange={selectR} />
                                    <label className="checkbox-label" htmlFor="r-2">-2</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id="r-1" className="pointer checkbox" value="-1" checked={false} onChange={selectR} />
                                    <label className="checkbox-label" htmlFor="r-1">-1</label>
                                </div>
                            </div>
                            <div id="R-second-row">
                                <div className="checkbox-container">
                                    <input type="checkbox" id="r0" className="pointer checkbox" value="0" checked={false} onChange={selectR} />
                                    <label className="checkbox-label" htmlFor="r0">0</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id="r1" className="pointer checkbox" value="1" checked={rValue === 1} onChange={selectR} />
                                    <label className="checkbox-label" htmlFor="r1">1</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id="r2" className="pointer checkbox" value="2" checked={rValue === 2} onChange={selectR} />
                                    <label className="checkbox-label" htmlFor="r2">2</label>
                                </div>
                            </div>
                            <div id="R-third-row">
                                <div className="checkbox-container">
                                    <input type="checkbox" id="r3" className="pointer checkbox" value="3" checked={rValue === 3} onChange={selectR} />
                                    <label className="checkbox-label" htmlFor="r3">3</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id="r4" className="pointer checkbox" value="4" checked={rValue === 4} onChange={selectR} />
                                    <label className="checkbox-label" htmlFor="r4">4</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id="r5" className="pointer checkbox" value="5" checked={rValue === 5} onChange={selectR} />
                                    <label className="checkbox-label" htmlFor="r5">5</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="graph-container">
                    <Graph width={300} height={300} minX={-6} maxX={6} minY={-6} maxY={6} radius={rValue} items={dotData} onClickChart={handleClickChart}/>
                </div>
                <div id="button-container">
                    <buttonBelle className="pointer button" id="check-button" onClick={() => sendCheckRequest(xValue, yValue, rValue)}>Check</buttonBelle>
                    <buttonBelle className="pointer button" id="clear-button" onClick={sendDeleteRequest}>Clear</buttonBelle>
                </div>
                <div id="table-container">
                    <table id="results">
                        <thead><tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Current time</th>
                            <th>Script time</th>
                            <th>Result</th>
                        </tr></thead>
                        <tbody>
                        {dotData && dotData.map(
                            (dot, i) => (
                                <tr key={i}>
                                    <td>{dot.x}</td>
                                    <td>{dot.y}</td>
                                    <td>{dot.r}</td>
                                    <td>{parseCurrentTime(dot.timestamp)}</td>
                                    <td>{parseScriptTime(dot.scriptTime)}</td>
                                    <td>{dot.status ? "hit" : "miss"}</td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppContainer>
    );
}
export default Input;
