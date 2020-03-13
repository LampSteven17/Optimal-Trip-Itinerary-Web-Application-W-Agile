package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

/** This class defines the Distance response that .
 *
 * When used with restful API services,
 * An object is created from the request JSON by the MicroServer using GSON.
 * The buildResponse method is called to set the configuration information.
 * The MicroServer constructs the response JSON from the object using GSON.
 *
 * When used for testing purposes,
 * An object is created using the constructor below.
 * The buildResponse method is called to set the configuration information.
 * The getDistance method is called to obtain the distance value for comparisons.
 */
public class RequestDistance extends RequestHeader {
    private Map<String, String> place1;
    private Map<String, String> place2;
    private Double earthRadius;
    private Long distance;

    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);


    RequestDistance() { //T? Stephen Herayda
        this.requestType = "distance";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }


    @Override
    public void buildResponse() {
        this.distance = calculateDistance(this.place1,this.place2, this.earthRadius);
    }
/**
 * Adapted from Haversine Method with elevation accuracy removed
 * https://stackoverflow.com/questions/3694380/calculating-distance-between-two-points-using-latitude-longitude
 *
 */
    protected static Long calculateDistance(Map<String, String> place1, Map<String, String> place2, Double earthRad) {
       Double dist1Lat = Double.parseDouble(place1.get("latitude")); //PARSE PLACE 1 and 2
       Double dist1Lng = Double.parseDouble(place1.get("longitude"));

       Double dist2Lat = Double.parseDouble(place2.get("latitude"));
       Double dist2Lng = Double.parseDouble(place2.get("longitude"));

       Double latDist = Math.toRadians(dist2Lat - dist1Lat);
       Double lngDist = Math.toRadians(dist2Lng - dist1Lng);

       Double a = Math.sin(latDist/2.0)
               * Math.sin(latDist/2.0)
               + Math.cos(Math.toRadians(dist1Lat))
               * Math.cos(Math.toRadians(dist2Lat))
               * Math.sin(lngDist/2.0)
               * Math.sin(lngDist/2.0);

       Double c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0-a));

       System.out.println("c is " + Math.round(earthRad * c));

       return Math.round(earthRad * c);
    }



}