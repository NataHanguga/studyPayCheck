// const express = require('express')
const fs = require('fs')

const dataLink = 'app/data/db.json'
const data = JSON.parse(fs.readFileSync(dataLink, 'utf-8'))

exports.createStudent = function (req) {
  let user = {
    'fullName': req.body.fullName,
    // 'department': req.body.department,
    'teacherName': req.body.teacher,
    'studentType': req.body.studentType,
    '_id': Date.now(),
    'dataCreating': req.body.date
  }

  // get month from full Date
  let month = (req.body.date).slice(3, 5);
  let startStudyMonth
  month.slice(0, 1) === '0' ? startStudyMonth = month.slice(1, 2) : startStudyMonth = month;

  let arr = [];

  for (let i = 0; i < 12; i++) {
    if (startStudyMonth > 12) {
      startStudyMonth %= 13
    }
    // check if student is beneficiary
    if (user.studentType === 'beneficiary') {
      arr[i] = {
        studyMonth: startStudyMonth++,
        price: 0,
        payed: true
      };
    } else {
      arr[i] = {
        studyMonth: startStudyMonth++,
        price: 0,
        payed: false
      };
    }
  }
  user.pay = arr;

  // console.log(data)
  data.push(user);
  fs.writeFileSync(dataLink, JSON.stringify(data), 'utf-8')
}

exports.deleteValueInObject = (obj, val, atr) => {
  for (let i = 0; i < obj.length; i++) {
    console.log(obj[i][atr] === +val)
    if (obj[i][atr] === +val) {
      obj.splice(i, 1)
      return obj;
    } else if (obj[i][atr] === null) {

      return -1
    }
  }
  return -1
}

exports.putMoneyByMonth = (id, money, data, tarif) => {
  if (money > 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === +id) {
        if (data[i].studentType === 'contract') {
          if (data[i].pay) {
            data[i].pay = hellMethod(data[i].pay,tarif, money)
          }
          console.log(data[i].pay)
        } else {
          return data
        }
      }
    }
    return data
  } else {
    return -1
  }

}

exports.sortByTeachers = (data) => {
  let arr = []
  data.forEach(el => {
    arr.push(el.teacherName)
  })
  let teachers = [...new Set(arr)]
  let array = []
  for (let i = 0; i < teachers.length; i++) {
    let teacherArray = []
    teacherArray.push(data.filter(el => {
      return el.teacherName === teachers[i]
    }))
    array.push({
      'teacher': teachers[i],
       'arr': teacherArray 
    })
      

  }
    console.log(array)
  return array

}

function hellMethod(pay, tarif, money) {
  console.log(tarif, money)
  return pay.map(item => {
    if (money && !item.price) {
      item.price += tarif
      money -= tarif
      item.payed = true
    }
    return item
  })
}