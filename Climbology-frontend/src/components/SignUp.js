// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function SignUpForm() {
//     const [currentStep, setCurrentStep] = useState(1);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle form submission
//     };

//     const nextStep = () => {
//         setCurrentStep(currentStep + 1);
//     };

//     const prevStep = () => {
//         setCurrentStep(currentStep - 1);
//     };

//     return (
//         <div className="signup-container">
//             <form className="signup-form" onSubmit={handleSubmit}>
//                 {/* Form Sections */}
//                 {currentStep === 1 && (
//                     <>
//                         <h1>Sign Up - Personal Details</h1>
//                         <input type="text" placeholder="Username" name="username" />
//                         <input type="email" placeholder="E-mail" name="email" />
//                         <input type="password" placeholder="Password" name="password" />
//                         <input type="password" placeholder="Confirm Password" name="confirmPassword" />
//                         <input type="text" placeholder="Last Name" name="lastName" />
//                         <input type="text" placeholder="First Name" name="firstName" />
//                         <button type="button" onClick={nextStep}>Next →</button>
//                     </>
//                 )}

//                 {currentStep === 2 && (
//                     <>
//                         <h1>Sign Up - Climbing Details</h1>
//                         {/* Climbing Details Inputs */}
//                         <input type="text" placeholder="Height" name="height" />
//                         <input type="text" placeholder="Weight" name="weight" />
//                         {/* ... Other climbing related inputs ... */}
//                         <button type="button" onClick={prevStep}>← Back</button>
//                         <button type="button" onClick={nextStep}>Next →</button>
//                     </>
//                 )}

//                 {currentStep === 3 && (
//                     <>
//                         <h1>Sign Up - Preferences</h1>
//                         {/* Preferences Inputs */}
//                         {/* ... Preference related inputs ... */}
//                         <button type="button" onClick={prevStep}>← Back</button>
//                         <button type="submit">Sign Up</button>
//                     </>
//                 )}
                
//                 <div className="signup-links">
//                     <Link to="/signin">Already have an account? Sign In</Link>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default SignUpForm;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
// import logoImage from '../assets/Logo.png'; // Import your logo image here
import './SignUp.css';
import Select from 'react-select';


function SignUp() {

  const climbingStyleOptions = [
    { value: 'Static', label: 'Static' },
    { value: 'Dynamic', label: 'Dynamic' },
    { value: 'Technical', label: 'Technical' },
    { value: 'Powerful', label: 'Powerful' }
  ];

  const climbingDisciplineOptions = [
    { value: 'Bouldering', label: 'Bouldering' },
    { value: 'Sport Climbing', label: 'Sport Climbing' },
    { value: 'Trad Climbing', label: 'Trad Climbing' },
    { value: 'Ice Climbing', label: 'Ice Climbing' }
  ];

  const wallTypeOptions = [
    { value: 'Vertical', label: 'Vertical' },
    { value: 'Slab', label: 'Slab' },
    { value: 'Slightly Overhanging', label: 'Slightly Overhanging' },
    { value: 'Overhanging', label: 'Overhanging' },
    { value: 'Roof', label: 'Roof' }
  ];


  const [selectedClimbingStyles, setSelectedClimbingStyles] = useState([]);
  const [selectedClimbingDiscipline, setSelectedClimbingDiscipline] = useState([]);
  const [selectedWallType, setSelectedWallType] = useState([]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1px solid #ddd', // Match border style
      borderRadius: '4px',      // Match border radius
      padding: '1rem',          // Match padding
      boxShadow: 'none',        // Remove box-shadow
      ':hover': {
        borderColor: '#aaa'     // Style for hover
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      textAlign: 'left',        // Align placeholder text to left
      color: '#aaa',             // Placeholder text color
    }),
    // Add other custom styles as needed
  };

  
  // Update the handleChange function to handle the Select component
  const handleClimbingStyleChange = (selectedOptions) => {
      setSelectedClimbingStyles(selectedOptions);
  };

  const handleClimbingDisciplineChange = (selectedOptions) => {
    setSelectedClimbingDiscipline(selectedOptions);
  };

  const handleWallTypeChange = (selectedOptions) => {
    setSelectedWallType(selectedOptions);
  };

  const navigate = useNavigate(); // Create useNavigate instance for redirection

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const formData = new FormData(event.target);
    const data = {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
        email: event.target.elements.email.value,
        first_name: event.target.elements.firstName.value,
        last_name: event.target.elements.lastName.value,
        gender: event.target.elements.gender.value,
        height: event.target.elements.height.value,
        weight: event.target.elements.weight.value,
        wingspan: event.target.elements.wingspan.value,
        ape_index: event.target.elements.ape_index.value,
        num_pull_ups: event.target.elements.num_pull_ups.value,
        num_chin_ups: event.target.elements.num_chin_ups.value,
        num_push_ups: event.target.elements.num_push_ups.value,
        // climbing_style: event.target.elements.climbing_style.value,
        climbing_style: selectedClimbingStyles.map(option => option.value), 
        fav_climbing_discipline: selectedClimbingDiscipline.map(option => option.value),
        fav_wall_type: selectedWallType.map(option => option.value),
        // fav_climbing_discipline: event.target.elements.fav_climbing_discipline.value,
        // fav_wall_type: event.target.elements.fav_wall_type.value
    };
    console.log(data);
    const response = await fetch('http://localhost:8000/account/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(response);
    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem('token', responseData.token); // Store the token in localStorage
      localStorage.setItem('username', responseData.username); // Store the user id in localStorage
      navigate(`/create/${responseData.username}`); // Redirect to the user-specific dashboard
  } else {
      // Handle error
      console.error('Response not OK:', response);
      alert("Failed to sign up. Please try again.");
  }
  };

return (
  <div className="signup-container">
    <form className="signup-form" onSubmit={handleSubmit}>
      {/* <img src={logoImage} alt="Emo AI Logo" className="signup-logo" /> Add this line */}
      <h1>Sign Up</h1>
      <input type="text" placeholder="Username" name="username" />
      <input type="email" placeholder="E-mail" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <input type="password" placeholder="Confirm Password" name="confirmPassword" />
      <input type="text" placeholder="Last Name" name="lastName" />
      <input type="text" placeholder="First Name" name="firstName" />
      <select name="gender" className="signup-dropdown">
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Non-binary">Non-binary</option>
        <option value="Other">Other</option>
      </select>
      <input type="text" placeholder="Height" name="height" />
      <input type="text" placeholder="Weight" name="weight" />
      <input type="text" placeholder="Wingspan" name="wingspan" />
      <input type="text" placeholder="Ape Index" name="ape_index" />
      <input type="text" placeholder="Number of Pull-ups" name="num_pull_ups" />
      <input type="text" placeholder="Number of Chin-ups" name="num_chin_ups" />
      <input type="text" placeholder="Number of Push-ups" name="num_push_ups" />
      
      {/* <select name="climbing_style" className="signup-dropdown" multiple>
        <option value="">Select Climbing Style</option>
        <option value="Static">Static</option>
        <option value="Dynamic">Dynamic</option>
        <option value="Technical">Technical</option>
        <option value="Powerful">Powerful</option>
      </select> */}
      {/* <Select
                    isMulti
                    name="climbing_style"
                    options={climbingStyleOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleClimbingStyleChange}
                    value={selectedClimbingStyles}
        /> */}
        <Select
          isMulti
          name="climbing_style"
          options={climbingStyleOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleClimbingStyleChange}
          value={selectedClimbingStyles}
          placeholder="Select Your Climbing Styles" 
          styles={customStyles} // Apply custom styles
        />

        <Select
          isMulti
          name="fav_climbing_discipline"
          options={climbingDisciplineOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleClimbingDisciplineChange}
          value={selectedClimbingDiscipline}
          placeholder="Select Your Favorite Climbing Disciplines"
          styles={customStyles} // Apply custom styles
        />

        <Select
          isMulti
          name="fav_wall_type"
          options={wallTypeOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleWallTypeChange}
          value={selectedWallType}
          placeholder="Select Your Favorite Wall Types"
          styles={customStyles} // Apply custom styles
        />


      
      {/* <select name="fav_climbing_discipline" className="signup-dropdown">
        <option value="">Select Favorite Climbing Discipline</option>
        <option value="Bouldering">Bouldering</option>
        <option value="Sport Climbing">Sport Climbing</option>
        <option value="Trad Climbing">Trad Climbing</option>
        <option value="Ice Climbing">Ice Climbing</option>
      </select>
      <select name="fav_wall_type" className="signup-dropdown">
        <option value="">Select Favorite Wall Type</option>
        <option value="Vertical">Vertical</option>
        <option value="Slab">Slab</option>
        <option value="Slightly Overhanging">Slightly Overhanging</option>
        <option value="Overhanging">Overhanging</option>
        <option value="Roof">Roof</option>
      </select> */}
      <button type="submit">Sign Up</button>
      <div className="signup-links">
        <Link to="/signin">Already have an account? Sign In</Link>
      </div>
    </form>
  </div>
);
}

export default SignUp;
