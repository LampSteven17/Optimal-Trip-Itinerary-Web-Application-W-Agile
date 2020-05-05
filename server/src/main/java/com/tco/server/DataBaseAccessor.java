package com.tco.server;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;

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

    protected DataBaseAccessor() {
        this.set_URL_based_on_environment();
    }


    protected DataBaseAccessor(String matchIn, int limit, String narrow) {
        this.set_URL_based_on_environment();
        String match = "\"%" + matchIn + "%\"";
        this.QUERY = "SELECT world.name, world.municipality, region.name, country.name, continent.name " +
                "FROM continent INNER JOIN country ON continent.id = country.continent " +
                "INNER JOIN region ON country.id = region.iso_country " +
                "INNER JOIN world ON region.id = world.iso_region " +
                "WHERE country.name LIKE " + match + " " +
                "OR region.name LIKE " + match + " " +
                "OR world.name LIKE " + match + " " +
                "OR world.municipality LIKE " + match + " " +
                "ORDER BY continent.name, country.name, region.name, world.municipality, world.name ASC " +
                "LIMIT " + limit;
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

    // TODO this is gonna need quite a bit of modification to do intended stuff
    protected ResultSet send_query() {
        ResultSet output = null;
        try (
            // connect to the database and query
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement query = conn.createStatement();
            ResultSet results = query.executeQuery(QUERY)
        ) {
            // iterate through query results and print out the column values
            int count = 0;
            output = results;
            while (results.next()) {
                System.out.printf("%6d %s\n", ++count, results.getString("region.latitude"));
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
        return output;
    }

    public String getURL() { return DB_URL; }

}
