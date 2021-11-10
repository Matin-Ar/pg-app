const express = require('express')
const pool = require('../db/pg')
const router = new express.Router()

router.get('/:table', async (req, res) => {
    try {
        const queryText = `SELECT * from ${req.params.table}`
        pool.query(queryText, async (err, result) => {
            if(err) {
                throw new Error("error hast ")
            }
            else {
                res.send(result.rows)
            }
        })
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/:table', (req, res) => {
    try {
        keys = Object.keys(req.body)
        keyString = ''
        keys.forEach((key) => {
            keyString = keyString.concat(key, ', ')
        })
        keyString = keyString.slice(0,-2)
        
        values = Object.values(req.body)
        values.forEach((value, index) => {
            values[index]= `'${value}'`
        })

        valueString = ''
        values.forEach((value) => {
            valueString = valueString.concat(value, ', ')
        })
        valueString = valueString.slice(0,-2)

        const queryText = `INSERT INTO ${req.params.table} (${keyString}) VALUES (${valueString});`
        pool.query(queryText, (err, result) => {
            if(err) {
                res.status(400).send()
            }
            else {
                res.send()
            }
        })
    } catch(e) {
        res.status(400).send()
    }
})

router.delete('/:table', (req, res) => {
    try {
        const queryText = `DELETE FROM ${req.params.table} WHERE ${Object.keys(req.body)[0]}='${Object.values(req.body)[0]}';`
        pool.query(queryText, (err, result) => {
            if(err) {
                res.status(400).send(err)
            }
            else {
                res.send()
            }
        })
    } catch(e) {
        res.status(400).send()
    }
})

router.patch('/:table', (req, res) => {
    try {
        keys = Object.keys(req.body)
        keys.shift()

        values = Object.values(req.body)
        values.shift()
        values.forEach((value, index) => {
            values[index]= `'${value}'`
        })
        
        myObjectString = ''

        keys.forEach((value, index) => {
            myObjectString = myObjectString.concat(value, '=', values[index], ', ')
        })
        myObjectString = myObjectString.slice(0,-2)

        const queryText = `UPDATE ${req.params.table} SET ${myObjectString} WHERE ${Object.keys(req.body)[0]}='${Object.values(req.body)[0]}';`
        pool.query(queryText, (err, result) => {
            if(err) {
                res.status(400).send()
            }
            else {
                res.send()
            }
        })
    } catch(e) {
        res.status(400).send()
    }
})

module.exports = router