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
        distances = calculateDistances(); // TODO wait till distance requests are going through to implement and write last test case
        log.trace("buildResponse -> {}", this);
    }

    private Long[] calculateDistances() {
        if (places.isEmpty()) {
            log.error("In calculateDistances() in RequestTrip.java the variable places is empty. Returning null. ");
            return null;
        }
        Long[] dists = new Long[places.size()];
        for (int i = 0; i < places.size()-1; i++){
                dists[i] = RequestDistance.calculateDistance(places.get(i), places.get(i+1), Double.valueOf(options.get("earthRadius")));
        }
        if (dists.length > 1) {
            // finish final round trip entry
            dists[dists.length-1] = RequestDistance.calculateDistance(places.get(places.size()-1), places.get(0), Double.valueOf(options.get("earthRadius")));
        }
        return dists;
    }


    // TESTS //
    public int getVersion() { return this.requestVersion; }
    public String getType() { return this.requestType; }


}

