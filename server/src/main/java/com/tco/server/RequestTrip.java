package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import com.tco.server.RequestDistance;
import com.tco.server.TripOptimization;
import org.json.*;

/*
This class defines the Trip response used with Restful API services
 */

public class RequestTrip extends RequestHeader{

    private List<Map < String, String> > places;
    private Long[] distances;
    private Options options;


    private final transient Logger log = LoggerFactory.getLogger(RequestDistance.class);

    RequestTrip() {
        this.requestType = "trip";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    @Override
    public void buildResponse() {
        this.distances = calculateDistances();
        log.trace("buildResponse -> {}", this);
    }

    private Long[] calculateDistances() {
        List<Map < String, String> > sorted_places = new ArrayList<Map<String, String>>();

        optimize(sorted_places);

        if (places.isEmpty()) {
            log.error("In calculateDistances() in RequestTrip.java the variable places is empty. Returning null. ");
            return null;
        }
        Long[] dists = new Long[sorted_places.size()];
        for (int i = 0; i < sorted_places.size()-1; i++){
                dists[i] = RequestDistance.calculateDistance(sorted_places.get(i), sorted_places.get(i+1), Double.valueOf(options.getEarthRadius()));
        }
        if (dists.length > 1) {
            // finish final round trip entry
            dists[dists.length-1] = RequestDistance.calculateDistance(sorted_places.get(sorted_places.size()-1), sorted_places.get(0), Double.valueOf(options.getEarthRadius()));
        }
        return dists;
    }


    private void optimize(List<Map < String, String> > sorted_places) {
        TripOptimization tripOpt = new TripOptimization(
                options.getConstruction(),
                options.getImprovement(),
                options.getResponse()
        );
        tripOpt.optimize(places, Double.valueOf(options.getEarthRadius()), sorted_places);
    }


    // TESTS //
    public int getVersion() { return this.requestVersion; }
    public String getType() { return this.requestType; }
    public void setUp(Options op, List<Map < String, String> > pl) {
        options = op; places = pl;
    }


}

