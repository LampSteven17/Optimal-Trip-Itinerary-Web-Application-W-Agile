package com.tco.server;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
Adopted from davemattcsu DataBaseExample.java
https://github.com/csucs314s20/guide/blob/master/Guides/Database/ExampleFiles/DatabaseExample.java
 */
public class DataBaseAccessor {
    // strings for either home computer or sprint deployment
    private final static String HOME_DEV_DB_URL = "jdbc:mysql://127.0.0.1:56247/cs314";
    private final static String DEPLOY_DB_URL = "jdbc:mysql://faure.cs.colostate.edu/cs314";
    private final static String TRAVIS_DB_URL = "jdbc:mysql://127.0.0.1/cs314";
    private String DB_URL = DEPLOY_DB_URL;
    // username or password via environment
    private final static String DB_TRAVIS = "root";
    private final static String DB_HOME_OR_DEPLOY = "cs314-db";
    private final static String DB_PASSWORD_HOME_OR_DEPLOY = "eiK5liet1uej";
    private  String DB_USER = DB_HOME_OR_DEPLOY;
    private String DB_PASSWORD = DB_PASSWORD_HOME_OR_DEPLOY;

    // SQL SELECT query statement
    private String QUERY;

    private final int MAX_LIMIT = 100;

    private String where;
    private String[] types;
    private String match;
    private int limit = MAX_LIMIT;
    private int found;

    protected DataBaseAccessor() {
        this.set_URL_based_on_environment();
        this.found = 0;
    }


    protected void setMatch(String match) {
        this.match = "\"%" + match + "%\"";
        this.QUERY = "SELECT * " +   ///SELECT world.name, world.municipality, region.name, country.name, continent.name,
                "FROM continent INNER JOIN country ON continent.id = country.continent " +
                "INNER JOIN region ON country.id = region.iso_country " +
                "INNER JOIN world ON region.id = world.iso_region " +
                "WHERE country.name LIKE " + this.match + " " +
                "OR region.name LIKE " + this.match + " " +
                "OR world.name LIKE " + this.match + " " +
                "OR world.municipality LIKE " + this.match + " " +
                "ORDER BY continent.name, country.name, region.name, world.municipality, world.name ASC ";
    }

    protected void setWhere(String where) {
        this.where = where;
    }

    protected void setTypes(String[] types) {
        this.types = types;
    }

    protected void setLimit(int limit) {
        if (limit < this.MAX_LIMIT && limit > 0) {                                                                                   // Only set if less than max limit
            this.limit = limit;
        }
    }

    protected Integer getFound() {
        return this.found;
    }


    // set export CS314_ENV=development
    private void set_URL_based_on_environment() {
        // environment variables
        String environment_home = System.getenv("CS314_ENV");
        String environment_TRAVIS = System.getenv("TRAVIS");

        if (environment_TRAVIS != null) {
            if (environment_TRAVIS.equals("true")) {
                DB_URL = TRAVIS_DB_URL;
                DB_USER = DB_TRAVIS;
                DB_PASSWORD = null;
            }
        } else if (environment_home != null) {
            if (environment_home.equals("development")) {
                DB_URL = HOME_DEV_DB_URL;
            }
        } else {
            DB_URL = DEPLOY_DB_URL;
        }
    }


    private String addTypes() {
        StringBuilder typesString = new StringBuilder();
        if(this.types != null && this.types.length > 0) {
            typesString.append(" AND (world.type LIKE \"%").append(this.types[0]).append("%\"");
            for (int i = 1; i < this.types.length; i++) {
                if(this.types[i] != null)
                    typesString.append(" OR world.type LIKE \"%").append(this.types[i]).append("%\"");
            }
            typesString.append(")");
        }
        return typesString.toString();
    }

    private String addWhere() {
        StringBuilder whereString = new StringBuilder();
        if(this.where != null) {
            whereString.append(" AND (country.name LIKE \"%").append(this.where).append("%\"")
                    .append(" OR region.name LIKE \"%").append(this.where).append("%\"")
                    .append(" OR world.municipality LIKE \"%").append(this.where).append("%\")");

        }
        return whereString.toString();
    }

    private void createQuery() {
        this.QUERY = "SELECT world.name, world.municipality, region.name, " +
                "country.name, continent.name, world.latitude, world.longitude, world.altitude, " +
                "world.type " +
                "FROM continent INNER JOIN country ON continent.id = country.continent " +
                "INNER JOIN region ON country.id = region.iso_country " +
                "INNER JOIN world ON region.id = world.iso_region " +
                "WHERE country.name LIKE " + this.match + " " +
                "OR region.name LIKE " + this.match + " " +
                "OR world.name LIKE " + this.match + " " +
                "OR world.municipality LIKE " + this.match +
                addTypes()  + addWhere() + " " +
                "ORDER BY continent.name, country.name, region.name, world.municipality, world.name ASC;";
    }


    private void createRandomQuery() {
        this.QUERY = "SELECT world.name, world.municipality, region.name, " +
                "country.name, continent.name, world.latitude, world.longitude, world.altitude, " +
                "world.type " +
                "FROM continent INNER JOIN country ON continent.id = country.continent " +
                "INNER JOIN region ON country.id = region.iso_country " +
                "INNER JOIN world ON region.id = world.iso_region " +
                "ORDER BY RAND() " +
                "LIMIT 1;";
    }


    protected List<Map<String, String>> send_query() {
        List<Map<String, String>> places = new ArrayList<>();
        Map<String, String> tempMap;
        if (match != null)
            createQuery();
        else
            createRandomQuery();

        try (
            // connect to the database and query
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement query = conn.createStatement();
            ResultSet results = query.executeQuery(QUERY)
        ) {
            while(results.next()) {
                if (this.found < this.limit) {
                    tempMap = new HashMap<>();

                    tempMap.put("name", results.getString("world.name"));
                    tempMap.put("municipality", results.getString("world.municipality"));
                    tempMap.put("region", results.getString("region.name"));
                    tempMap.put("country", results.getString("country.name"));
                    tempMap.put("continent", results.getString("continent.name"));
                    tempMap.put("latitude", results.getString("world.latitude"));
                    tempMap.put("longitude", results.getString("world.longitude"));
                    tempMap.put("altitude", results.getString("world.altitude"));
                    tempMap.put("type", results.getString("world.type"));
                    places.add(tempMap);
                }
                found++;
            }
            System.out.println(places + "\n\n\n");
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
        return places;
    }



    public String getURL() { return DB_URL; }

}
