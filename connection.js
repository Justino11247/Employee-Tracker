const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Onyxspice@11',
    database: 'employee_db',
    port: 5432
},
    
    console.log("database Connected!")
);

module.exports = pool;