package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class TestOptions {
    private Options options;
    private Optimization optimization;

    @Before
    public void createConfigurationForTestCases(){
        options = new Options("1000.0", "Test Title");
        optimization = new Optimization();
    }

    @Test
    public void testSetOptions() {
        assertEquals("Test Title", "Test Title", options.getTitle());
        assertEquals("Test Earth Radius", "1000.0", options.getEarthRadius());
    }

    @Test
    public void testSetOptimizationBlank() {
        options.setOptimization(optimization);
        assertEquals("Test Construction", null, options.getConstruction());
        assertEquals("Test Improvement", null, options.getImprovement());
        assertEquals("Test Response", (byte) 1, options.getResponse());
    }

    @Test
    public void testConstructor() {
        Options testNoArgs = new Options();
    }


}
