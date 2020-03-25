package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class TestRequestTrip {
    private RequestTrip trip;

    @Before
    public void createConfigurationForTestCases(){
        trip = new RequestTrip();
        //trip.buildResponse();
    }

    @Test
    public void testType() {
        String type = trip.getType();
        assertEquals("config requestType", "trip", type);

    }

    @Test
    public void testVersion() {
        int version = trip.getVersion();
        assertEquals("config requestVersion", 3, version); // TODO update
    }




}
