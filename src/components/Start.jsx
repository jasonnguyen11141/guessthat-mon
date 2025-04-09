import { Link } from "react-router-dom";

const Start = ({
    title = "guess that 'mon",

    
  }) => {
    return (
        <div><h1 className="font-bold text-4xl whitespace-nowrap">{title}</h1></div>
    );
  };