package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import t10.server.src.main.java.com.tco.server.RequestDistance;


/*
This class defines the Trip response used with Restful API services
 */

public class RequestTrip extends RequestHeader{

    private Map<String, String> options;
    private List<Map < String, String> > places;
    private Long[] distances;
    private Double earthRadius; // maybe some capital D Doubles here



    // CONSTRUCTOR
    RequestTrip() {
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION; // TODO is this right?
    }



    @Override
    public void buildResponse() {
            /* Everything else is required in the client request
               Also need to check if the given distances mean anything
             */
            distances = calculateDistances(places);
    }

    private Long[] calculateDistances(List< Map<String, String> > places) {
        Long[] dists = new Long[places.size()];

            for (int i = 0; i < places.size()-1; i++){
                // check if name is null
                if (places.get(i).get("name") == null) {
                    return dists;
                } else {
                    dists[i] = RequestDistance.calculateDistance(places.get(i), places.get(i+1), earthRadius);
                }
            }
            if (dists.length > 1) {
                // finish final entry
                dists[dists.length-1] = RequestDistance.calculateDistance(places.get(0), places.get(places.size()-1), earthRadius);
            }
            // do last and first outside of loop
        return dists;
    }





}
