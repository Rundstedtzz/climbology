import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import kilter_board from '../assets/kilter_board.png'; // Ensure the path is correct
import './Create.css'; // Make sure the CSS file is named correctly and imported
import { useNavigate } from 'react-router-dom';


function KilterBoard() {
    const [selectedHolds, setSelectedHolds] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [newHold, setNewHold] = useState(null);
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);
    
    const handleClick = async (e) => {
        const NUM_GRID_COLUMNS = 35; // Number of columns in the grid
        const NUM_GRID_ROWS = 38; // Number of rows in the grid
        const GRID_X_INCREMENT = 1; // Number of pixels between each column
        const GRID_Y_INCREMENT = 1; // Number of pixels between each row
        const rect = e.target.getBoundingClientRect();

        const originalHeight = e.target.naturalHeight;
        const originalWidth = e.target.naturalWidth;

        const clickX = e.clientX - rect.left; // X coordinate relative to the image
        const clickY = e.clientY - rect.top; // Y coordinate relative to the image
        console.log("clickX: ", clickX);
        console.log("clickY: ", clickY);
        console.log("e.clientX: ", e.clientX);
        console.log("e.clientY: ", e.clientY);
        const cellWidth = rect.width / NUM_GRID_COLUMNS; // Width of one cell
        const cellHeight = rect.height / NUM_GRID_ROWS; // Height of one cell
    
        const x = Math.floor(clickX / cellWidth) * GRID_X_INCREMENT;
        const y = NUM_GRID_ROWS - Math.ceil(clickY / cellHeight) -1;


        try {
            // Update this URL to the correct endpoint
            const url = 'http://localhost:8000/create/identify_hold/';
            
            const response = await axios.post(url, { x, y });
            
            if (response.data.success) {
                const holdX = response.data.x_coordinate;
                const holdY = response.data.y_coordinate;

                // Convert grid coordinates back to pixel coordinates
                const pixelX = holdX * cellWidth + cellWidth / 2;
                const pixelY = (NUM_GRID_ROWS - holdY - 1) * cellHeight + cellHeight / 2;

                const newHold = {
                    id: response.data.holdId,
                    x_grid: response.data.x_coordinate,
                    y_grid: response.data.y_coordinate,
                    x_coor: e.clientX,
                    y_coor: e.clientY,
                    hold_type: response.data.type,
                    hold_function: response.data.function,
                    hold_depth: response.data.depth,
                    hold_orientation: response.data.orientation,
                    hold_size: response.data.size,
                    isSelected: true,
                };
                setSelectedHolds(prevHolds => prevHolds.map(hold => ({ ...hold, isSelected: false })).concat(newHold));
        
                // console.log('Hold identified:', response.data.holdId, response.data.x_coordinate, response.data.y_coordinate, pixelX, pixelY);
                // console.log('Hold identified:', selectedHolds);
                // pass to selectedHolds to backend

            } else {
                console.error('No hold identified:', response.data.message);
            }
        } catch (error) {
            console.error('Error when identifying hold:', error);
        }
    };



    useEffect(() => {
        console.log('Updated Holds:', selectedHolds);
    }, [selectedHolds]);
    
    const updateHoldType = (holdType) => {
        setSelectedHolds(prevHolds => 
            prevHolds.map(hold => 
                hold.isSelected ? { ...hold, hold_position_in_route: holdType, isSelected: false } : hold
            )
        );
    };

    const getCircleColor = (holdType) => {
        switch (holdType) {
            case 'Start': return 'green';
            case 'Middle': return 'blue';
            case 'Finish': return 'purple';
            case 'Foot Only': return 'orange';
            default: return 'red';
        }
    };

    
    const renderCircles = () => {
        return selectedHolds.map((hold, index) => (
            <div 
                key={index}
                className="circle"
                style={{
                    top: hold.y_coor,
                    left: hold.x_coor,
                    borderColor: getCircleColor(hold.hold_position_in_route),
                }}
            />
        ));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/create/create_route/', { holds: selectedHolds });
            console.log('Response:', response.data);
            setResponse(response.data);
            // Handle response or further actions here
        } catch (error) {
            console.error('Error sending holds to backend:', error);
            // Handle error here
        }
    };

    const handleChange = async () => {
      // Navigate to the chatbot page with state
      navigate("/routeops/", { state: { holds: selectedHolds, response: response} });
    };
    
    // Render the dropdown for the currently selected hold
    const dropdownForSelectedHold = selectedHolds.find(hold => hold.isSelected);
    const renderDropdown = () => {
        return dropdownForSelectedHold && (
            <DropdownMenu currentHold={dropdownForSelectedHold} updateHoldType={updateHoldType} />
        );
    };


    const DropdownMenu = ({ currentHold, updateHoldType }) => {
        const handleSelection = (holdType) => {
            updateHoldType(holdType);
            setShowDropdown(false); // Hide dropdown after selection
        };
    
        return (
        
            <div className="dropdown-menu" style={{ top: currentHold.y_coor, left: currentHold.x_coor + 50 }}>
                <button onClick={() => handleSelection('Start')}>Start</button>
                <button onClick={() => handleSelection('Middle')}>Middle</button>
                <button onClick={() => handleSelection('Finish')}>Finish</button>
                <button onClick={() => handleSelection('Foot Only')}>Foot Only</button>
                </div>

        );
    };

    return (
        <div className="kilterBoardContainer">
            <img src={kilter_board} alt="Kilter Board" className="kilter-board" onClick={handleClick} />
            {renderCircles()}
            {renderDropdown()}
            <button onClick={handleSubmit} className = "buttonx">Generate Beta</button>
            <button onClick={handleChange} className = "buttonx">Route Operations</button>
        </div>
    );
    
    
    }

export default KilterBoard;