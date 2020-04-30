package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class TestFind {

    private Find find;

    @Before
    public void createConfigurationForTestCases(){
        find = new Find("test", 0, 0);
        find.requestType = "find"; find.requestVersion = 5;
        try {
            find.buildResponse();
        } catch (Exception e) {
            // shouldnt get here but just in case
            System.out.println("\n\nThe error occurred in build response for find\n");
        }
    }

    @Test
    public void testUsualThings() {
        assertEquals("find requestVersion", 5, (int)find.requestVersion);
        assertEquals("find requestType", "find", find.requestType);
    }

    @Test
    public void testNarrowNulls() {
        List<String> type = new ArrayList<>();
        List<Map<String, String>> places = new ArrayList<Map<String, String>>();
        find.setForTesting(places, type, "where");
        assertEquals("find where", "where", find.getWhere());
        assertEquals("find where", 0, find.getTypes().length);
    }

}
