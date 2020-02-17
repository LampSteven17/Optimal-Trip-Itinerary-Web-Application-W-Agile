package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;

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
    private Object place1;
    private Object place2;
    private Float earthRadius;
    private Integer distance;

    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);


    RequestDistance() {
        this.requestType = "distance";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }


    @Override
    public void buildResponse() {

    }



}

