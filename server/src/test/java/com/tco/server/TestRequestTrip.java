package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class TestRequestTrip {
    private RequestTrip trip;

    @Before
    public void createConfigurationForTestCases(){
        trip = new RequestTrip();
        setupForResponse();
        try {
            trip.buildResponse();
        } catch (IOException i) {
            // hmm
        }
    }

    @Test
    public void testType() {
        String type = trip.getType();
        assertEquals("trip requestType", "trip", type);
    }

    @Test
    public void testVersion() {
        int version = trip.getVersion();
        assertEquals("trip requestVersion", 5, version);
    }

    private void setupForResponse() {
        List<Map< String, String>> places = new ArrayList<Map<String, String> >();
        Map<String, String> p1 = new HashMap<String, String>();
        Map<String, String> p2 = new HashMap<String, String>();
        Map<String, String> p3 = new HashMap<String, String>();
        p1.put("latitude", "10"); p1.put("longitude", "10"); p3.put("name", "place1");
        p2.put("latitude", "0"); p2.put("longitude", "0"); p3.put("name", "place2");
        p3.put("latitude", "-10"); p3.put("longitude", "-10"); p3.put("name", "place3");
        places.add(p1); places.add(p2); places.add(p3);
        // set up options
        Options options = new Options("3959.0", "test init");
        Optimization optimization = new Optimization();
        options.setOptimization(optimization);

        trip.setUp(options, places);
    }




}
