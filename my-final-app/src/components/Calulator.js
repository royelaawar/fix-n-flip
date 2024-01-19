import React, { useState, useEffect } from 'react';
import logo from '../icon-fixnflip.png';

function CalculatorComponent(props) {
  const initialBudget = {
    PlansSurvey: 0,
    Permits: 0,
    Dumpsters: 0,
    TempWater: 0,
    TempElectric: 0,
    Demo: 0,
    UtilityTieIn: 0,
    Stormwater: 0, 
    Landscaping: 0,
    Footing: 0, 
    Foundation: 0,
    FramingMaterial: 0, 
    FramingLabor: 0, 
    Roofing: 0,
    Siding: 0,
    Gutters: 0,
    Windows: 0,
    ExteriorDoors: 0,
    PlumbingRough: 0,
    HVACRough: 0,  
    ElectricalRough: 0,
    Sheetrock: 0,
    Insulation: 0, 
    Staircase: 0,
    Railings: 0, 
    WoodFlooring: 0,
    TileFlooring: 0,
    InteriorDoors: 0,
    DoorHardware: 0, 
    InteriorTrim: 0,
    Paint: 0,
    Closets: 0, 
    Cabinets: 0,
    Countertops: 0,
    Appliances: 0,
    Hardware: 0,
    TileBackslplash: 0,
    ShowerDoors: 0, 
    Tubs: 0,
    Toilets: 0,
    Vanities: 0,
    GarageDoors: 0,
    Decking: 0,
    Fireplace: 0,
    Driveway: 0,
    Patio: 0,
    BuilderFee: 0,
    DevelopmentFee: 0,
    Pool: 0,
    Fences: 0,
    Contingency: 0,
    // ... Add all other fields as 0
  };

  const [budget, setBudget] = useState(initialBudget);
  const [tempValues, setTempValues] = useState(initialBudget);
  const [total, setTotal] = useState(0);
  const [streetAddress, setStreetAddress] = useState("");

  const handleChange = (e) => {
    setBudget({ ...budget, [e.target.name]: parseFloat(e.target.value) || 0 });
    setTempValues({ ...tempValues, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    if (e.target.value === '0') {
      setTempValues({ ...tempValues, [e.target.name]: '' });
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      setTempValues({ ...tempValues, [e.target.name]: '0' });
    }
  };

  useEffect(() => {
    setTotal(Object.values(budget).reduce((acc, curr) => acc + curr, 0));
  }, [budget]);

  const handleSave = () => {
    props.onSaveBudget({ total, streetAddress }); 
  };

  const handleAddressChange = (e) => {
    setStreetAddress(e.target.value);
  };

  return (
    <div className="calculator-container">
      <img src={logo} alt="FixnFlip Logo" className="top-left-logo" />
      <h1 className="budget-calc">Budget Calculator</h1>
      <form style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', gap: '10px', alignItems: 'center' }}>
        {/* Mapping logic for input fields */}
        {Object.keys(initialBudget).map((key) => (
          <React.Fragment key={key}>
            <label>{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
            <input 
              type="number" 
              name={key}
              value={tempValues[key]}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ maxWidth: '150px' }}
            />
          </React.Fragment>
        ))}
      </form>
      <div style={{ marginTop: '20px', fontWeight: 'bold', textAlign: 'center' }}>
        Total: ${total.toFixed(2)}
        <input
          type="text"
          placeholder="Enter Street Address"
          value={streetAddress}
          onChange={handleAddressChange}
          style={{ marginLeft: '10px', maxWidth: '200px' }}
        />
        <button onClick={handleSave} style={{ marginLeft: '10px' }}>Save to Profile</button>
      </div>
    </div>
  );
}

export default CalculatorComponent;