package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class TestRequestDistance{

    private RequestDistance dist;

    @Before
    public void createConfigurationForTestCases(){
        dist = new RequestDistance();
        /* have to set variables to build response */
        Map<String, String> p1 = new HashMap<String, String>();
        Map<String, String> p2 = new HashMap<String, String>();
        p1.put("latitude", "10"); p1.put("longitude", "10");
        p2.put("latitude", "0"); p2.put("longitude", "0");
        dist.testDistance(p1, p2, 1000.0);

        dist.buildResponse();
    }

    @Test
    public void testType() {
        String type = dist.getType();
        assertEquals("distance requestType", "distance", type);
    }

    @Test
    public void testVersion() {
        int version = dist.getVersion();
        assertEquals("distance requestVersion", 3, version);
    }
}
