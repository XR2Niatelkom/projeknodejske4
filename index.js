const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const moment = require("moment")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "penyewaan mobil"
})

db.connect(error => {
    if(error){
        console.log(error.message)
    } 
    else {
        console.log("MySQL Connected")
    }
})

app.get("/pelanggaan", (req,res) => {
    let sql = "select * from pelanggaan"
    db.query(sql,(error,result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

app.get("/pelanggaan/:id_pelanggaan", (req,res) => {
    let data = {
        id_pelanggaan:req.params.id_pelanggaan
    }
    let sql = "select * from pelanggaan where ?"
    db.query(sql,data, (error, result) => {
        let response = null 
        if (error){
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})


app.post("/pelanggaan", (req,res) => {
    let data = {
        nama_pelanggaan: req.body.nama_pelanggaan,
        alamat_pelanggan: req.body.alamat_pelanggan,
        kontak: req.body.kontak
    }
    let sql = "insert into pelanggaan set ?"
    db.query(sql,data,(error,result) => {
        let response = null 
        if (error) {
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                message: result.affectedRows + "data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/pelanggaan", (req,res) => {
    let data = [
        {
        nama_pelanggaan: req.body.nama_pelanggaan,
        alamat_pelanggan: req.body.alamat_pelanggan,
        kontak: req.body.kontak
    },
    {
        id_pelanggan:req.body.id_pelanggan
    }
    ]
    let sql = "update pelanggaan set ? where ?"
    db.query(sql,data,(error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        }
        else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/pelanggaan/:id_pelanggaan", (req,res) => {
    let data = {
        id_pelanggan: req.params.id_pelanggan
    }

    let sql = "delete from pelanggaan where ?"
    db.query(sql,data,(error,result) =>{
        let response = null 
        if(error) {
            response = {
                message: error.message
            }
        }
        else {
            response = {
                message: result.affectedRows + "data deleted"
            }
        }
        res.json(response)
    })
})

app.get("/karyawan", (req,res) => {
    let sql = "select * from karyawan"
    db.query(sql,(error,result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

app.get("/karyawan/:id_karyawan", (req,res) => {
    let data = {
        id_karyawan:req.params.id_karyawan
    }
    let sql = "select * from karyawan where ?"
    db.query(sql,data, (error, result) => {
        let response = null 
        if (error){
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})


app.post("/karyawan", (req,res) => {
    let data = {
        nama_karyawan: req.body.nama_karyawan,
        alamat_karyawan: req.body.alamat_karyawan,
        kontak: req.body.kontak,
        username: req.body.username,
        password: req.body.password

    }
    let sql = "insert into karyawan set ?"
    db.query(sql,data,(error,result) => {
        let response = null 
        if (error) {
            response = {
                message: error.message
            }
        } 
        else {
            response = {
                message: result.affectedRows + "data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/karyawan", (req,res) => {
    let data = [
        {
        nama_karyawan: req.body.nama_karyawan,
        alamat_karyawan: req.body.alamat_karyawan,
        kontak: req.body.kontak,
        username: req.body.username,
        password: req.body.password
    },
    {
        id_karyawan:req.body.id_karyawan
    }
    ]
    let sql = "update karyawan set ? where ?"
    db.query(sql,data,(error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        }
        else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/karyawan/:id_karyawan", (req,res) => {
    let data = {
        id_karyawan: req.params.id_karyawan
    }

    let sql = "delete from karyawan where ?"
    db.query(sql,data,(error,result) =>{
        let response = null 
        if(error) {
            response = {
                message: error.message
            }
        }
        else {
            response = {
                message: result.affectedRows + "data deleted"
            }
        }
        res.json(response)
    })
})



app.listen(7000,() => {
    console.log("bismillah")
})