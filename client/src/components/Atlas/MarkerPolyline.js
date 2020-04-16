import React, {Component} from 'react';
import {Polyline} from "react-leaflet";

export class MarkerPolyline extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="csu-branding">
                {this.drawLines()}
            </div>
        )
    }

    drawLines() {
        let points = this.getPositions();
        let lines;

        if (points.length > 1) {
            lines = this.generateLineArray(points);

            return (
                <div>
                    {lines}
                </div>
            );
        }
    }

    getPositions() {
        let latlngArray = [];
        this.props.markerPosition.forEach((marker, i) => {
            latlngArray.push([marker.lat, marker.lng]);
        });

        if (this.props.markerPosition.length >= 2){
            latlngArray.push(latlngArray[0]);
        }
        return latlngArray;
    }

    generateLineArray(points) {
        let lines = [];

        for (let i = 1; i < points.length; i++) {
            let checkLng = points[i-1][1] - points[i][1];
            let currentLine = [points[i-1], points[i]];

            if (Math.abs(checkLng) > 180) {
                lines = lines.concat(this.lineAcrossMeridian(points[i-1], points[i]));
            }
            else {
                lines.push(
                    <Polyline key={Date.now() * Math.random()} color="red" positions={currentLine} />
                );
            }
        }

        return lines;
    }

    lineAcrossMeridian(point1, point2) {
        let lines = [];

        if (point1[1] < 0) {

            lines.push(this.polylineRenders(point1, [point2[0], point2[1] - 360]),this.polylineRenders([point1[0], point1[1] + 360], point2));

        }else{

            lines.push(this.polylineRenders([point2[0], point2[1] + 360], point1),this.polylineRenders(point2, [point1[0], point1[1] - 360]));

        }
        return lines;
    }

    polylineRenders(inputOne, inputTwo) {
        return <Polyline key={Date.now() * Math.random()} color="red" positions={[inputOne, inputTwo]} />
    }

}
export default MarkerPolyline
