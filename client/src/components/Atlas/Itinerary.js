import React, {Component} from 'react';
import '../tcowebstyle.css';
import {Table} from 'reactstrap';
import {
    List,
    arrayMove
} from 'react-movable';


/***************
 * For full References Vist: https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
 * Used Basic Structure and Outlines for Class Dev
 * Used React implemented JS HEader
 * Formatting is from included CSS
 */

class Itinerary extends Component {

    constructor(props){
        super(props);
        this.state = {
            dests: this.props.dests
        };
    }


    render(){
        return(
            <div key={this.props.dests} className="csu-branding">
                <Table striped responsive className="table">
                    <tbody>
                        <tr>{this.renderHeader()}</tr>
                        {this.renderData()}
                    </tbody>
                </Table>
                {/* <List values={['Item 1', 'Item 2', 'Item 3']} /> */}
            </div>
        )
    }

    static getDerivedStateFromProps(props, state) {
        if (props.dests !== state.dests) {
            return {
                dests: props.dests
            };
        }

        return null;
    }

    renderData(){
        return this.state.dests.map((dest) => {
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
        let head = Object.keys(this.props.dests[0]);

        return head.map((key,index) => {
            if(key!="id") {
                return <th key={index}> {key.toUpperCase()} </th>
            }
        })
    }




}

export default Itinerary
