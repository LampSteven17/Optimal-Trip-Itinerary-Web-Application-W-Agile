package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;
import com.tco.server.RequestDistance;


/*
This class defines the Trip response used with Restful API services
 */

public class RequestTrip extends RequestHeader{

    private Map<String, String> options;
    private List<Map < String, String> > places;
    private Long[] distances;
    private Double earthRadius;

    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);

    RequestTrip() {
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Override
    public void buildResponse() {
            /* Everything else is required in the client request
               Also need to check if the given distances mean anything
             */
        distances = calculateDistances(); // TODO wait till distance requests are going through to implement and write last test case
        log.trace("buildResponse -> {}", this);
    }

    private Long[] calculateDistances() {
        if (places.isEmpty())
            return null;
        System.out.println(places.get(0).get("latitude"));
        Long[] dists = new Long[places.size()];
        for (int i = 0; i < places.size()-1; i++){
                //System.out.println(places.get(i));
                dists[i] = RequestDistance.calculateDistance(places.get(i), places.get(i+1), Double.valueOf(options.get("earthRadius")));
        }
        if (dists.length > 1) {
            // finish final round trip entry
            dists[dists.length-1] = RequestDistance.calculateDistance(places.get(places.size()-1), places.get(0), Double.valueOf(options.get("earthRadius")));
        }
        for (Long l : dists)
            System.out.println(l + " hella");
        return dists;
    }


    // TESTS //
    public int getVersion() { return this.requestVersion; }
    public String getType() { return this.requestType; }





}

