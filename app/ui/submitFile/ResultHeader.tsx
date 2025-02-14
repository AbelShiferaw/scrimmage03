const ResultHeader = () => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">
          Processed Excel Data
        </h1>
  
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Excel Format
        </h2>
  
        <p className="text-sm text-gray-500">
          <strong>1st Cell:</strong> Group Number Only <br />
          <strong>2nd Cell:</strong> Name (Make sure it&apos;s unique) <br />
          <strong>Next 5 Cells:</strong> Trait 1, Trait 2, Trait 3, Trait 4, Trait 5
        </p>
  
        <h2> Example </h2>
        <p className="text-xl font-bold text-red-600 mb-2">  
          10, Abel, Strength, Strategic, Empathy, Patience, Leadership 
        </p>
        <br/>
        
        <p>
          * Make sure first cell is just a number with no strings and that you include 5 gallup Strengths!
        </p>
      </div>
    );
  };
  
  export default ResultHeader;
  