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

    private String DB_URL = DEPLOY_DB_URL;

    // shared user with read-only access
    private final static String DB_USER = "cs314-db";
    private final static String DB_PASSWORD = "eiK5liet1uej";

    // SQL SELECT query statement
    private final static String COLUMN = "id";
    private final static String QUERY = "SELECT DISTINCT "+ COLUMN +" FROM world ORDER BY "+ COLUMN +" ASC;";

    protected DataBaseAccessor() {
        this.set_URL_based_on_environment();
    }

    // set export CS314_ENV=development
    private void set_URL_based_on_environment() {
        String environment = System.getenv("CS314_ENV");
        if (environment == null)
            return;

        if (environment.equals("development"))
            DB_URL = HOME_DEV_DB_URL;
    }

    // TODO this is gonna need quite a bit of modification to do intended stuff
    protected void send_query() {
        try (
            // connect to the database and query
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement query = conn.createStatement();
            ResultSet results = query.executeQuery(QUERY)
        ) {
            // iterate through query results and print out the column values
            int count = 0;
            while (results.next()) {
                System.out.printf("%6d %s\n", ++count, results.getString(COLUMN));
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }

    }

    public String getURL() { return DB_URL; }

}
