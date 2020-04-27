package com.tco.server;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
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

    protected void optimize(List<Map < String, String> > places, double earthRadius, List<Map < String, String> > sorted_places) throws IOException {

        if (this.construction != null) {
            if (this.construction.equals("NONE")) {
                sorted_places.addAll(places);
                return;
            }
        }

        this.earthRadius = earthRadius;
        this.start_time = System.currentTimeMillis();

        // initialize 2-d array
        generateHashMap(places);

        if (this.improvement != null) {
            if (this.improvement.equals("none")){
                nearest_neighbor(places, sorted_places);
            } else {
                sorted_places.addAll(places);
                throw new IOException("2opt and 3opt not supported.");
            }
            return;
        }
        // un init means we should choose, hence NN
        nearest_neighbor(places, sorted_places);
        return;
    }

    private void nearest_neighbor(List<Map < String, String> > places, List<Map < String, String> > sorted_places) {
        boolean[] visited = new boolean[distance_matrix.length];
        Arrays.fill(visited, false);
        visited[0] = true;
        sorted_places.add(places.get(0));
        int current_place = 0;

        for (int place_index = 0; place_index < this.distance_matrix.length - 1; place_index++) {
            if (System.currentTimeMillis() - this.start_time >= this.cutoff_time) {
                append_unsorted_items_for_trip(sorted_places, places, visited);
                return;
            }
            int next_destination = nn_get_next(visited, current_place);
            sorted_places.add(places.get(next_destination));
            visited[next_destination] = true;
            current_place = next_destination;
        }
        return;
    }

    private int nn_get_next(boolean[] visited, int index_of_head) {
        long lowest_value = Long.MAX_VALUE;
        int return_index = -1;

        for (int index = 0; index < distance_matrix.length; index++) {
            if (visited[index])
                continue;

            if (arrayHelper(index, index_of_head, lowest_value)) {
                return_index = index;
                lowest_value = distance_matrix[index][index_of_head];
            } else if (arrayHelper(index_of_head, index, lowest_value)) {
                return_index = index;
                lowest_value = distance_matrix[index_of_head][index];
            }
        }
        return return_index;
    }

    private boolean arrayHelper(int a, int b, long lowest_value) {
        if (distance_matrix[a][b] > 0 && distance_matrix[a][b] < lowest_value) {
            return true;
        }
        return false;
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
        int places_length = places.size();
        this.distance_matrix = new long[places_length][places_length];

        for(int i=0;i<places_length;i++) {
            for(int j=0;j<places_length;j++) {
                distance_matrix[i][j] = (i < j) ? RequestDistance.calculateDistance(places.get(i), places.get(j), this.earthRadius) : -1;
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


}
