const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const path = require('path');
const {
	handleLogin,
	protectionLayer,
	handleLogout,
	getAllBooks,
	getSpecificBook,
	updateSpecificBook,
	createBook,
	getStudentDetails,
	getBookByClass,
	createInvoice,
	reductBooks,
	getAllStudents,
	getSpecificStudent,
	updateSpecificStudent,
	createStudent,
	getAllInvoices,
	getSpecificBill,
	getTodaysReport
} = require('../controllers/controller.js');
const conn = require('../controllers/dbConnect.js');

router.route('/login')
	.post(handleLogin)

router.route('/home')
	.get(protectionLayer, (req, res) => { res.sendFile(path.join(__dirname, '../public/home.html')); })

router.route('/logout')
	.get(handleLogout)

router.route('/books')
	.get(protectionLayer, (req, res) => { res.sendFile(path.join(__dirname, '../public/books_home.html')) })

router.route('/student')
	.get(protectionLayer, (req, res) => { res.sendFile(path.join(__dirname, '../public/students_home.html')) })

router.route('/viewBills')
	.get(protectionLayer, (req, res) => { res.sendFile(path.join(__dirname, '../public/viewBills.html')) })

router.route('/todaysReport')
	.get(protectionLayer, (req, res) => { res.sendFile(path.join(__dirname, '../public/todays_report.html')) })

router.route('/get-all-books')
	.get(protectionLayer, getAllBooks)

router.route('/get-all-students')
	.get(protectionLayer, getAllStudents)

router.route('/get-all-invoices')
	.get(protectionLayer, getAllInvoices)

router.route('/get-todays-report')
	.get(protectionLayer,getTodaysReport)

router.route('/getStudentDetails?:rid')
	.get(getStudentDetails)

router.route('/editStudents?:rid')
	.get(protectionLayer, (req, res) => {
		var rid=req.query.rid;
		if(rid=="")
		{
			res.sendFile(path.join(__dirname, '../public/edit_students.html')) 
		}
		else
		{
			res.sendFile(path.join(__dirname, `../public/edit_students.html?rid='${rid}'`))
		} 
	})
		

router.route('/getBookByClass?:cl')
	.get(getBookByClass)

router.route('/get-specific-book?:id')
	.get(getSpecificBook)

router.route('/get-specific-invoice?:id')
	.get(getSpecificBill)

router.route('/get-specific-student?:rid')
	.get(getSpecificStudent)

router.route('/update-book?:id')
	.put(updateSpecificBook)
	.post(createBook)

router.route('/update-student?:rid')
	.put(updateSpecificStudent)
	.post(createStudent)

router.route('/reductBooks?:class')
	.get(reductBooks)

router.route('/createInvoice')
	.get(protectionLayer,(req,res)=>{res.sendFile(path.join(__dirname,'../public/generateBill.html'))})
	.post(protectionLayer, createInvoice)



// router.route('/test')
// 	.get(test)

module.exports = router;