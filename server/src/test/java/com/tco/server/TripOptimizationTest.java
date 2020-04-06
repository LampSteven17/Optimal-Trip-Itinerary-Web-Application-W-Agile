package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class TripOptimizationTest {
    private TripOptimization tripOpt;

    @Before
    public void createConfigurationForTestCases(){
        tripOpt = new TripOptimization("none", "none", (byte) 1);
    }


    /* -------- CADE'S TEST IDEAS ------- (since we really need to test this)
       * Create a trip object, test off that
       * test each opt level, using setters to change opt level in each one
       * test with small subsets where we know the correct answer
       * test for timing in each of these too, dave wants ~1 second response time
     */

    @Test
    public void testOptimizationBasic() {
        List<Map< String, String>> placesOptimized = tripOpt.optimize(setUpPlacesStatic());
        // we need to test for time and response
        // only initially going to test for non null response
        assert placesOptimized.isEmpty() != true : "Test that places was returned non-null";
    }



    // set up a basic places list for testing
    private List<Map < String, String> > setUpPlacesStatic() {
        List<Map< String, String>> places = new ArrayList<Map<String, String> >();
        Map<String, String> p1 = new HashMap<String, String>();
        Map<String, String> p2 = new HashMap<String, String>();
        Map<String, String> p3 = new HashMap<String, String>();
        p1.put("latitude", "10"); p1.put("longitude", "10"); p3.put("name", "place1");
        p2.put("latitude", "0"); p2.put("longitude", "0"); p3.put("name", "place2");
        p3.put("latitude", "-10"); p3.put("longitude", "-10"); p3.put("name", "place3");
        places.add(p1); places.add(p2); places.add(p3);

        return places;
    }



}