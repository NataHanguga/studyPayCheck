const express = require('express')
const router = express.Router()
const fs = require('fs')

const dataLink = 'app/data/db.json'
const data = JSON.parse(fs.readFileSync(dataLink, 'utf-8'))
const tarifLink = 'app/data/tarifPrice.json'
const tarifData = JSON.parse(fs.readFileSync(tarifLink, 'utf-8'))
const utills = require('./utills')

// return all data about students
router.get('/students', (req, res) => {
  res.send(data);
})

// add new student to DB
router.post('/student', (req, res) => {

  for (let i = 0; i < data.length; i++){
    if (req.body.fullName === data[i].fullName)
      return res.status(400).send('This student already added to dataBase');
  } 
  utills.createStudent(req); // add student data to .json
  res.status(200).send('Student add to dataBase successfully')
})

//delete student by id from DB
router.delete('/student/:id', (req,res) => {
  let id = req.params.id
  let i = utills.deleteValueInObject(data, req.params.id, '_id')
  console.log(id, i)
  if (i !== -1) {
    fs.writeFileSync(dataLink, JSON.stringify(i), 'utf-8')
    res.send(JSON.parse(fs.readFileSync(dataLink, 'utf-8')))
  }
  res.status(404).send(data)
 })

 // add money by each month 
router.put('/student/:id', (req, res) => {
  let id = req.params.id
  let money = req.body.money
  let tarif = tarifData.tarifPrice
  let newPay = utills.putMoneyByMonth(id, money, data, tarif);
  if (newPay !== -1) {
    fs.writeFileSync(dataLink, JSON.stringify(newPay), 'utf-8')
    res.send(newPay)
  }
  // res.status(404).send('Money less zero')
})

//sorted array of objects by teachers
router.get('/list/byTeachers', (req, res) => {
  let sortByTeacher = utills.sortByTeachers(data)
  res.send(sortByTeacher);
})

router.get('/student/:id', (req, res) => {
  let id = req.params.id
  let student
   data.map(elem => {
     console.log(elem)
    if (elem._id === +id) {
    //  console.log(elem.fullName)
     student = elem
    }
  })
  console.log(student)
  res.send(student)
})

router.get('/tarifPrice', (req, res) => {
  res.send(tarifData);
})







module.exports = router;