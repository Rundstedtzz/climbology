import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import kilter_board from '../assets/kilter_board.png'; // Ensure the path is correct
import './RouteOps.css'; // Make sure the CSS file is named correctly and imported
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const RouteOps = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { holds, response } = location.state || {};
    // console.log(holds);
    // console.log("response", response);
    // console.log("response.result", response.result);

    // State variables
    const [selectedHoldId, setSelectedHoldId] = useState('');
    const [selectedHoldProperty, setSelectedHoldProperty] = useState('');
    const [holdValue, setHoldValue] = useState('');
    const [selectedMoveProperty, setSelectedMoveProperty] = useState('');
    const [moveValue, setMoveValue] = useState('');
    const [selectedStartHoldID, setSelectedStartHoldID] = useState('');
    const [selectedEndHoldID, setSelectedEndHoldID] = useState('');
    const [updateHoldStatus, setUpdateHoldStatus] = useState('');
    const [deleteHoldStatus, setDeleteHoldStatus] = useState('');
    const [updateMoveStatus, setUpdateMoveStatus] = useState('');
    const [deleteMoveStatus, setDeleteMoveStatus] = useState('');
    const [outputFindHoldsByProperty, setOutputFindHoldsByProperty] = useState('');
    const [outputFindMovesByProperty, setOutputFindMovesByProperty] = useState('');


    const handleHoldIdChange = (event) => {
        setSelectedHoldId(event.target.value);
    };

    // Function to handle the change in hold property dropdown
    const handleHoldPropertyChange = (event) => {
        setSelectedHoldProperty(event.target.value);
    };

    // Function to handle the change in hold value input
    const handleHoldValueChange = (event) => {
        setHoldValue(event.target.value);
    };

    // Function to handle the change in move property dropdown
    const handleMovePropertyChange = (event) => {
        setSelectedMoveProperty(event.target.value);
    };

    // Function to handle the change in move value input
    const handleMoveValueChange = (event) => {
        setMoveValue(event.target.value);
    };

    // Function to handle the change in start hold id dropdown
    const handleStartHoldIDChange = (event) => {
        setSelectedStartHoldID(event.target.value);
    };

    // Function to handle the change in end hold id dropdown
    const handleEndHoldIDChange = (event) => {
        setSelectedEndHoldID(event.target.value);
    };

    // Event handler for updating holds
    const handleUpdateHold = async () => {
        try {
            const res = await axios.post('http://localhost:8000/routeops/update_hold/', { 
                holdId: selectedHoldId, 
                property: selectedHoldProperty, 
                value: holdValue 
            });
            console.log(res.data); // handle the response
            if (res.data && res.data.status === 'success') {
                setUpdateHoldStatus("Update successful!");
            } else {
                setUpdateHoldStatus("Update failed!");
            }
        } catch (error) {
            console.error(error); // handle the error
            setUpdateHoldStatus("Update failed!");
        }
    };

    // Event handler for deleting holds
    const handleDeleteHold = async () => {
        try {
            const res = await axios.post('http://localhost:8000/routeops/delete_hold/', {
                holdId: selectedHoldId
            });
            console.log(res.data); // handle the response
            // Set the delete status message based on the response
            if (res.data && res.data.status === 'success') {
                setDeleteHoldStatus("Delete successful!");
            } else {
                setDeleteHoldStatus("Delete failed!");
            }
        } catch (error) {
            console.error(error); // handle the error
            setDeleteHoldStatus("Delete failed!");
        }
    };

    // Event handler for updating moves
    const handleUpdateMove = async () => {
        try {
            const res = await axios.post('http://localhost:8000/routeops/update_move/', {
                startHoldId: selectedStartHoldID,
                endHoldId: selectedEndHoldID,
                property: selectedMoveProperty,
                value: moveValue
            });
            console.log(res.data); // handle the response
            if (res.data && res.data.status === 'success') {
                setUpdateMoveStatus("Update successful!");
            } else {
                setUpdateMoveStatus("Update failed!");
            }
        } catch (error) {
            console.error(error); // handle the error
            setUpdateMoveStatus("Update failed!");
        }
    };

    // Event handler for deleting moves
    const handleDeleteMove = async () => {
        try {
            const res = await axios.post('http://localhost:8000/routeops/delete_move/', {
                startHoldId: selectedStartHoldID,
                endHoldId: selectedEndHoldID
            });
            console.log(res.data); // handle the response
            if (res.data && res.data.status === 'success') {
                setDeleteMoveStatus("Delete successful!");
            } else {
                setDeleteMoveStatus("Delete failed!");
            }
        } catch (error) {
            console.error(error); // handle the error
            setDeleteMoveStatus("Delete failed!");
        }
    };

    // Event handler for finding nodes by property
    // const handleFindHoldsByProperty = async () => {
    //     try {
    //         const res = await axios.post('http://localhost:8000/routeops/find_holds_by_property/', {
    //             property: selectedHoldProperty,
    //             value: holdValue
    //         });
    //         console.log(typeof(res.data));
    //         // const x = json.loads(res.data);
    //         console.log(json.loads(res.data));
    //         console.log(typeof(json.loads(res.data)));
    //         // setOutputFindHoldsByProperty(res.data.result);
    //         // const data = await response.json(); // handle the response
    //         // setOutputFindHoldsByProperty(data);
    //     } catch (error) {
    //         console.error(error); // handle the error
    //         // setDeleteMoveStatus("Delete failed!");
    //     }
    // };

    const handleFindHoldsByProperty = async () => {
        try {
            const res = await axios.post('http://localhost:8000/routeops/find_holds_by_property/', {
                property: selectedHoldProperty,
                value: holdValue
            });
    
            // Log the type and content of the response data
            console.log(typeof(res.data), res.data);
    
            // Assuming the backend sends the data in the 'result' key
            // Update the state with the received data
            setOutputFindHoldsByProperty(res.data.result);
        } catch (error) {
            console.error(error); // handle the error
            // setDeleteMoveStatus("Delete failed!");
        }
    };
    






    
    // Event handler for finding moves by property
    const handleFindMovesByProperty = async () => {
        try {
            const res = await axios.post('http://localhost:8000/routeops/find_moves_by_property/', {
                property: selectedMoveProperty,
                value: moveValue
            });
            // Log the type and content of the response data
            console.log(typeof(res.data), res.data);
    
            // Assuming the backend sends the data in the 'result' key
            // Update the state with the received data
            setOutputFindMovesByProperty(res.data.result);
        } catch (error) {
            console.error(error); // handle the error
            // setDeleteMoveStatus("Delete failed!");
        }
    };


    // Function to get unique keys from the holds objects
    const getHoldKeys = () => {
        if (holds && holds.length > 0) {
            return Object.keys(holds[0]);
        }
        return [];
    };

    const holdKeys = getHoldKeys();


    const getMoveKeys = () => {
        if (response && response.result && response.result.beta && response.result.beta.length > 0) {
            return Object.keys(response.result.beta[0]);
        }
        return [];
    }

    const moveKeys = getMoveKeys();


    return (
        <>
        {/* Update Holds */}
        <div className="routeops-container">
            <h1>Update Holds</h1>
            <select name="hold_id" className="hold_id" onChange={handleHoldIdChange}>
                {holds && holds.map(hold => (
                    <option key={hold.id} value={hold.id}>
                        {`Hold ID: ${hold.id}`}
                    </option>
                ))}
            </select>
            <select name="hold_property" className="hold_property" onChange={handleHoldPropertyChange}>
                {holdKeys.map((key, index) => (
                    <option key={index} value={key}>
                        {key}
                    </option>
                ))}
            </select>
            <input type="text" name="hold_value" className="hold_value" onChange={handleHoldValueChange}/>
            <button type="submit" className="submit" onClick={handleUpdateHold}>Confirm</button>
            {updateHoldStatus && <p>{updateHoldStatus}</p >}
        </div>

        {/* Delete Holds */}
        <div className="routeops-container">
            <h1>Delete Holds</h1>
            <select name="hold_id" className="hold_id" onChange = {handleHoldIdChange}>
                {holds && holds.map(hold => (
                    <option key={hold.id} value={hold.id}>
                        {`Hold ID: ${hold.id}`}
                    </option>
                ))}
            </select>
            <button type="submit" className="submit" onClick={handleDeleteHold}>Confirm</button>
            {deleteHoldStatus && <p>{deleteHoldStatus}</p >}
        </div>

        {/* Update Moves */}
        <div className="routeops-container">
            <h1>Update Moves</h1>
            <select name = "start_hold_id" className='hold_id' onChange = {handleStartHoldIDChange}>
                {holds && holds.map(hold => (
                    <option key={hold.id} value={hold.id}>
                        {`Start Hold ID: ${hold.id}`}
                    </option>
                ))}
            </select>
            <select name = "end_hold_id" className='hold_id' onChange = {handleEndHoldIDChange}>
                {holds && holds.map(hold => (
                    <option key={hold.id} value={hold.id}>
                        {`End Hold ID: ${hold.id}`}
                    </option>
                ))}
            </select>
            <select name="move_property" className="move_property" onChange={handleMovePropertyChange}>
                {moveKeys.map((key, index) => (
                    <option key={index} value={key}>
                        {key}
                    </option>
                ))}
            </select>
            <input type="text" name="move_value" className="move_value" onChange = {handleMoveValueChange}/>
            <button type="submit" className="submit" onClick={handleUpdateMove}>Confirm</button>
            {updateMoveStatus && <p>{updateMoveStatus}</p >}
        </div>

        {/* Delete Moves */}
        <div className="routeops-container">
            <h1>Delete Moves</h1>
            <select name = "start_hold_id" className='hold_id' onChange = {handleStartHoldIDChange}>
                {holds && holds.map(hold => (
                    <option key={hold.id} value={hold.id}>
                        {`Start Hold ID: ${hold.id}`}
                    </option>
                ))}
            </select>
            <select name = "end_hold_id" className='hold_id' onChange = {handleEndHoldIDChange}>
                {holds && holds.map(hold => (
                    <option key={hold.id} value={hold.id}>
                        {`End Hold ID: ${hold.id}`}
                    </option>
                ))}
            </select>
            <button type="submit" className="submit" onClick={handleDeleteMove}>Confirm</button>
            {deleteMoveStatus && <p>{deleteMoveStatus}</p >}
        </div>

        {/* Find Holds by Property */}
        <div className="routeops-container">
            <h1>Find Holds by Property</h1>
            <select name="hold_property" className="hold_property" onChange = {handleHoldPropertyChange}>
                {holdKeys.map((key, index) => (
                    <option key={index} value={key}>
                        {key}
                    </option>
                ))}
            </select>
            <input type="text" name="hold_value" className="hold_value" onChange = {handleHoldValueChange}/>
            <button type="submit" className="submit" onClick={handleFindHoldsByProperty}>Confirm</button>
            {/* Display the holds */}
            <div>{outputFindHoldsByProperty && <p>{outputFindHoldsByProperty}</p >}</div>
            {/* {outputFindHoldsByProperty && (
                <ul>
                    {outputFindHoldsByProperty.map((hold, index) => (
                        <li key={index}>
                            {Object.entries(hold).map(([key, value]) => (
                                <span key={key}>{key}: {value.toString()}, </span>
                            ))}
                        </li>
                    ))}
                </ul>
            )} */}

        </div>

        {/* Find Moves by Property */}
        <div className="routeops-container">
            <h1>Find Moves by Property</h1>
            <select name="move_property" className="move_property" onChange = {handleMovePropertyChange}>
                {moveKeys.map((key, index) => (
                    <option key={index} value={key}>
                        {key}
                    </option>
                ))}
            </select>
            <input type="text" name="move_value" className="move_value" onChange = {handleMoveValueChange}/>
            <button type="submit" className="submit" onClick={handleFindMovesByProperty}>Confirm</button>
            <div>{outputFindMovesByProperty && <p>{outputFindMovesByProperty}</p >}</div>
        </div>
        </>
    );
}

export default RouteOps;