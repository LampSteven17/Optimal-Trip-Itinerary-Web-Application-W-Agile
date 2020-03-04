package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


/*
This class defines the Trip response used with Restul API services
 */

public class RequestTrip extends RequestHeader{

    private Map<String, String> options;
    private List<Map < String, String> > places;
    private double[] distances;



    // CONSTRUCTOR
    RequestTrip() {
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION; // TODO is this right?
    }



    @Override
    public void buildResponse() {
        if (distances.length < 1) {
            // Then we need to calculate
        }
    }

    private double[] calculateDistances(List< Map<String, String> > places) {
        double[] dists = new double[places.size()];

            for (int i = 0; i < places.size(); i++){

            }

        return dists;
    }



}
