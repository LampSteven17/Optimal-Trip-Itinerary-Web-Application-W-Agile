package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class TestRequestTrip {
    private RequestTrip trip;

    @Before
    public void createConfigurationForTestCases(){
        trip = new RequestTrip();
        trip.buildResponse();
    }

    @Test
    public void testRequestTypeAndVersion() {
        int version = trip.getVersion();
        String type = trip.getType();
        assertEquals("config requestType", "trip", type);
        assertEquals("config requestVersion", 3, version);
    }
}
