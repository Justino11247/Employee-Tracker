const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'employee_db',
    port: 5432
},
    
    console.log("database Connected!")
);

module.exports = pool;