import React from 'react'
import './SpaceShipComponant.css'
const SpaceShipComponant = ({ details }) => {



    return (
        <React.Fragment>
            <div className="card">
                <img id={details.flight_number} src={details.links.mission_patch} alt="" className="logo" />

                <h3 style={{
                    color: "blue",
                    fontWeight: "normal"
                }}>{`${details.mission_name} #${details.flight_number}`}</h3>

                <div>

                    <h4>Mission id: </h4>
                    {
                        details.mission_id.length === 0 ?
                            <li className="listItem">No mission id</li> :
                            details.mission_id.map((id) => {
                                return (
                                    <li className="listItem">{id}</li>
                                );
                            })
                    }

                </div>
                <div>
                    <h4>Launch year: <span style={
                        {
                            fontWeight: "normal",
                            display: "inline"
                        }
                    }>{details.launch_year}</span> </h4>
                </div>

                <div>
                    <h4>Successful Launch: <span style={
                        {
                            fontWeight: "normal",
                            display: "inline"
                        }
                    }>{details.launch_success ? "True" : "False"}</span> </h4>
                </div>

                <div>
                    <h4>Successful Landing: <span style={
                        {
                            fontWeight: "normal",
                            display: "inline"
                        }
                    }>{
                            details.rocket.first_stage.cores[0].land_success ? "True" : "False"
                        }</span> </h4>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SpaceShipComponant
