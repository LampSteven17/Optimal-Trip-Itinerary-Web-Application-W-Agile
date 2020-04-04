package com.tco.server;


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



    // setters, for testing and otherwise
    protected void setImprovement(String improvement) {this.improvement = improvement;}
    protected void setConstruction(String construction) { this.construction = construction;}
    protected void setResponse(byte response) {
        this.response = (response > 60 || response < 1) ? 1 : response;
    }

    // Guide/guides/Optimization
}
