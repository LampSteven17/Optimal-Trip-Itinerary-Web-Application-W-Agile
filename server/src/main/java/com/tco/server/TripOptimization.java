package com.tco.server;


import java.util.List;
import java.util.Map;

/*
This class is designed to do all the sorting and optimization algorithms and take them away from the trip class for
testing and modular code.
 */
public class TripOptimization {
    // Class variables
    private String improvement;
    private String construction;
    private byte response = 1; // default response time in seconds


    // Constructor
    protected TripOptimization(String improvement, String construction, byte response) {
        setImprovement(improvement);
        setConstruction(construction);
        setResponse(response);
    }

    protected List<Map< String, String>> optimize(List<Map < String, String> > places) {
        // driver for optimization
        // will call based on what opt is set too (switch statement)
        // if nothing is provided then it needs to be done anyways?
        return places;
    }



    // setters, for testing and otherwise
    protected void setImprovement(String improvement) {this.improvement = improvement;}
    protected void setConstruction(String construction) { this.construction = construction;}
    protected void setResponse(byte response) {
        this.response = (response > 60 || response < 1) ? 1 : response;
    }

    // Guide/guides/Optimization
}
