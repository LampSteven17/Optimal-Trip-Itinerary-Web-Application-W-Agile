import React, {Component} from 'react';
import '../tcowebstyle.css';
import {Table} from 'reactstrap';

/***************
 * For full References Vist: https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
 * Used Basic Structure and Outlines for Class Dev
 * Used React implemented JS HEader
 * Formatting is from included CSS
 */

class Itinerary extends Component{

    constructor(props){
        super(props);

        this.state={
            destinations: [
                {id: 1, destination: "Denver", leg: 0, total: 0},
                {id: 2, destination: "Boulder", leg: 20, total: 20},
                {id: 3, destination: "Fort Collins", leg: 40, total: 60},
                {id: 4, destination: "Denver", leg: 50, total: 110}

            ]
        }
    }


    render(){
        return(
            <div className="csu-branding">
                <Table className="table">
                    <tbody>
                        <tr>{this.renderHeader()}</tr>
                        {this.renderData()}
                    </tbody>
                </Table>
            </div>
        )
    }


    renderData(){
        return this.state.destinations.map((dest,index) => {
            const {id, destination, leg, total } = dest;
            return(
                <tr key={id}>
                    <td>{destination}</td>
                    <td>{leg}</td>
                    <td>{total}</td>
                </tr>

            )
        })

    }

    renderHeader(){
        let head = Object.keys(this.state.destinations[0]);

        return head.map((key,index) => {
            if(key!="id") {
                return <th key={index}> {key.toUpperCase()} </th>
            }
        })
    }




}

export default Itinerary

