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

}
