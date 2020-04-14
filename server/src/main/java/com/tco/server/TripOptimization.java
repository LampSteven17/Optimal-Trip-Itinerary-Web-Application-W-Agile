package com.tco.server;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;
import java.util.Arrays;




/*
This class is designed to do all the sorting and optimization algorithms and take them away from the trip class for
testing and modular code.
 */
public class TripOptimization {
    // Class variables
    private String improvement;
    private String construction;
    private byte response = 1; // default response time in seconds
    private double earthRadius=0;


    private final transient Logger log = LoggerFactory.getLogger(TripOptimization.class);


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

        int length = places.size();
        long[][] tempy = new long[length][length];

        generateHashMap(places,tempy,length);


        String stringy="\n\n\n";
        for (long[] row : tempy)
            stringy += (Arrays.toString(row) + "\n");

        log.info(stringy);


        return places;
    }




    protected void generateHashMap(List<Map < String, String> > places,long[][] tempy,int length){

        log.info(Integer.toString(length));
        log.info(String.valueOf(earthRadius));

        for(int i=0;i<length;i++) {
            for(int j=0;j<length;j++) {

                if(i<j){
                    tempy[i][j] = RequestDistance.calculateDistance(places.get(i), places.get(j), earthRadius);
                }else{
                    tempy[i][j] = -1;
                }


            }
        }

    }



    // setters, for testing and otherwise
    protected void setImprovement(String improvement) {this.improvement = improvement;}
    protected void setConstruction(String construction) { this.construction = construction;}
    protected void setResponse(byte response) {
        this.response = (response > 60 || response < 1) ? 1 : response;
    }
    protected void setEarthRadius(double e){this.earthRadius = e;}

    // Guide/guides/Optimization
}
