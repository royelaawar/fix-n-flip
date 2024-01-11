import React, { useState, useEffect } from 'react';

function CalculatorComponent() {
  const initialBudget = {
    plansSurvey: 0,
    permits: 0,
    dumpsters: 0,
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
  const [total, setTotal] = useState(0);

  const handleChange = (e) => {
    setBudget({ ...budget, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const calculateTotal = () => {
    return Object.values(budget).reduce((acc, curr) => acc + curr, 0);
  };

  useEffect(() => {
    setTotal(calculateTotal());
  }, [budget]); // Recalculate total whenever budget changes

  return (
    <div>
      <h1>Budget Calculator</h1>
      <form>
        <label>
          Plans/Survey:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Permits:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Dumpster:
          <input 
            type="number" 
            name="dumpster" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
        Temp Water:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
        Temp Electric:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Demo:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
        Utility TieIn:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Stormwater:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Landscaping:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
        Foundation:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Footing:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
        Framing Material:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Framing Labor:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Roofing:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Siding:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Gutters:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Windows:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Exterior Doors:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Plumbing Rough:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          HVAC Rough:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Electrical Rough:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Sheetrock:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Insulation:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Staircase:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Wood Flooring:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
        Tile Flooring:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Interio Doors:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
        Hardware:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Interior Trim:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Paint:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Closets:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Cabinets:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Countertops:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Appliances:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Door Hardware:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Tile Backsplash:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Shower Doors:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Tubs:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Toilets:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Vanities:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Garage Doors:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
        Decking:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Fireplace:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Driveway:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Patio:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Builder Fee:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Pool:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Fences:
          <input 
            type="number" 
            name="plansSurvey" 
            value={budget.plansSurvey} 
            onChange={handleChange} 
          />
        </label>
        <label>
          Contingency:
          <input 
            type="number" 
            name="permits" 
            value={budget.permits} 
            onChange={handleChange} 
          />
        </label>
        
      </form>
      <div>Total: ${total.toFixed(2)}</div>
    </div>
  );
}

export default CalculatorComponent;
