package com.tco.server;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
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
    private long[][] distance_matrix;

    private long cutoff_time;
    private long start_time;


    private final transient Logger log = LoggerFactory.getLogger(TripOptimization.class);


    // Constructor
    protected TripOptimization(String improvement, String construction, byte response) {
        setImprovement(improvement);
        setConstruction(construction);
        setResponse(response);
        this.cutoff_time = (this.response * 1000) - 250;
    }

    protected List<Map< String, String>> optimize(List<Map < String, String> > places) {
        // driver for optimization
        // will call based on what opt is set too (switch statement)
        // if nothing is provided then it needs to be done anyways?

        // Start time
        this.start_time = System.currentTimeMillis();

        // initialize 2-d array
        generateHashMap(places);

        /* Verification of algorithm, delete after completion */
        String stringy="\n\n\n";
        for (long[] row : this.distance_matrix)
            stringy += (Arrays.toString(row) + "\n");
        log.info(stringy);
        /* ***************************************** */


        return places;
    }

    private List<Map < String, String> > nearest_neighbor(List<Map < String, String> > places) {
        List<Map < String, String> > sorted_places = new ArrayList<Map<String, String>>();
        boolean[] visited = new boolean[distance_matrix.length];
        Arrays.fill(visited, false);
        visited[0] = true;
        sorted_places.add(places.get(0));
        int current_place = 0;

        for (int place_index = 0; place_index < this.distance_matrix.length; place_index++) {
            if (System.currentTimeMillis() - this.start_time >= this.cutoff_time) {
                return append_unsorted_items_for_trip(sorted_places, places, visited);
            }
            int next_destination = nn_get_next(visited, current_place);
            sorted_places.add(places.get(next_destination));
            visited[next_destination] = true;
            current_place = next_destination;
        }
        return sorted_places;
    }

    private int nn_get_next(boolean[] visited, int index_of_head) {

        long lowest_value = 0;
        int return_index = -1;

        for (int index = 0; index < distance_matrix.length; index++) {
            if (distance_matrix[index][index_of_head] > 0 && distance_matrix[index][index_of_head] < lowest_value) {
                if (visited[index])
                    continue;
                return_index = index;
                lowest_value = distance_matrix[index][index_of_head];
            }

            if (distance_matrix[index_of_head][index] > 0 && distance_matrix[index_of_head][index] < lowest_value) {
                if (visited[index])
                    continue;
                return_index = index;
                lowest_value = distance_matrix[index][index_of_head];
            }
        }

        return return_index;
    }

    private List<Map < String, String> > append_unsorted_items_for_trip(List<Map < String, String> > sorted, List<Map < String, String> > unsorted, boolean[] visited) {
        for (int i = 0; i < unsorted.size(); i++) {
            if (!visited[i]) {
                sorted.add(unsorted.get(i));
            }
        }
        return sorted;
    }


    protected void generateHashMap(List<Map < String, String> > places){
        /* Verification of algorithm, delete after completion */
        log.info("Size of places: " + places.size());
        log.info("Earth Radius: " + earthRadius);
        /* ***************************************** */

        int places_length = places.size();
        this.distance_matrix = new long[places_length][places_length];

        for(int i=0;i<places_length;i++) {
            for(int j=0;j<places_length;j++) {
                distance_matrix[i][j] = (i < j) ? RequestDistance.calculateDistance(places.get(i), places.get(j), earthRadius) : -1;
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
