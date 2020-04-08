package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.json.JSONObject;
import org.json.JSONArray;

import static org.junit.Assert.assertEquals;

public class TestRequestTrip {
    private RequestTrip trip;

    @Before
    public void createConfigurationForTestCases(){
        trip = new RequestTrip();
        setupForResponse();
        trip.buildResponse();
    }

    @Test
    public void testType() {
        String type = trip.getType();
        assertEquals("trip requestType", "trip", type);
    }

    @Test
    public void testVersion() {
        int version = trip.getVersion();
        assertEquals("trip requestVersion", 3, version);
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

        Map<String, String> options = new HashMap<String, String>();
        Map<String, String> optimization = new HashMap<String, String>();
        optimization.put("response", "2"); optimization.put("construction", "none"); optimization.put("improvement", "none"); // for now
        options.put("title", "test init"); options.put("earthRadius", "3959.0");

        trip.setUp(options, places, optimization);
    }




}
