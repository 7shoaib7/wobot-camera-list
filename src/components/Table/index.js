import React from 'react';

//assets
import warningIcon from "../../assets/WarningIcon.svg";
import cloudIcon from "../../assets/Cloud.svg";
import deviceIcon from "../../assets/Edge.svg";
import actionInactiveIcon from "../../assets/ActionInactiveIcon.svg";
import actionActiveIcon from "../../assets/ActionActiveIcon.svg";

const Table = ({ data, onDelete, onStatusChange }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" className="table-checkbox" />
                    </th>
                    <th>NAME</th>
                    <th>HEALTH</th>
                    <th>LOCATION</th>
                    <th>RECORDER</th>
                    <th>TASKS</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.length ? data.map((camera) => (
                    <tr key={camera._id}>
                        <td><input type="checkbox" className="table-checkbox" /></td>
                        <td>
                            <div className="name">
                                <div className="name-top">
                                    <div className="name-status" style={{ backgroundColor: camera.current_status === "Online" ? "#029262" : "#DC3545" }}></div>
                                    <div className="name-text">{camera.name}</div>
                                    {camera.hasWarning && <img src={warningIcon} alt="warning-icon" className="name-warning" />}
                                </div>
                            </div>
                            <div className="name-bottom">
                                <span>sherwinwilliams@wobot.ai</span>
                            </div>

                        </td>
                        <td>
                            <div className="health">
                                <div className="health-cloud">
                                    <img src={cloudIcon} alt="cloud-icon" />
                                    <span className="health-text">{camera.health.cloud}</span>
                                </div>
                                <div className="health-device">
                                    <img src={deviceIcon} alt="device-icon" />
                                    <span className="health-text">{camera.health.device}</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span className="location">{camera.location}</span>
                        </td>
                        <td>
                            <span className="recorder">{camera.recorder !== "" ? camera.recorder : 'N/A'}</span>
                        </td>
                        <td>
                            <span className="tasks">{camera.tasks} Tasks</span>
                        </td>
                        <td>
                            <div className="status" style={{ backgroundColor: camera.status === "Active" ? '#0292621A' : "#F0F0F0" }}>
                                <span className="status-text"
                                    style={{
                                        color: camera.status === "Active" ? '#029262' : "#545454"
                                    }}>
                                    {camera.status === 'Active' ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </td>
                        <td>
                            <div className="action" onClick={() => onStatusChange(camera.id, camera.status === "Active" ? "Inactive" : "Active")}>
                                {camera.status === "Active" ? <img src={actionActiveIcon} alt="action-icon" />
                                    : <img src={actionInactiveIcon} alt="action-icon" />}
                            </div>
                        </td>
                        <td>
                            <div className="delete-row" style={{ background: "#DC3545", cursor: "pointer" }} onClick={() => onDelete(camera._id)}>
                                <span className="delete-row-text" style={{ color: "white" }}>Delete</span>
                            </div>
                        </td>
                    </tr>
                )) : null}
            </tbody>
        </table>
    )
}

export default Table