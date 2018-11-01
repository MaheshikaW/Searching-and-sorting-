import React, { Component } from 'react';
import {Glyphicon,FormControl,Form} from 'react-bootstrap';

export class Search extends React.Component {

  render() {
   

    const styleCard = {
      borderStyle: 'ridge',
      borderWidth: 'thin',
}
const styleForm ={
  padding:"20px"
}

    return (
      <div>
        <div style={styleCard} className="row">
          <div className="card">
            <br /><br />
           
            <Form inline style={styleForm}>
             
            <Glyphicon glyph="search" /> &nbsp;
            <FormControl
            type="text"
            onChange={this.props.searchHandler}
            value={this.props.term}
            placeholder="School Name.."
           
          /> 
          
           &nbsp;
           <FormControl
            type="text"
            onChange={this.props.searchYearHandler}
                value={this.props.year}
            placeholder="School Year.."
           
          />         
              &nbsp;
              <FormControl
            type="text"
            onChange={this.props.searchDistrictHandler}
                value={this.props.district}
            placeholder="District.."
           
          />             
              &nbsp;

                    </Form>
            <div>

            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;