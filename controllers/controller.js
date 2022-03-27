const conn = require('./dbConnect.js');
const { v4: uuidv4 } = require('uuid');



const protectionLayer = (req, res, next) => {
	if (req.session.user) next();
    else res.redirect('/');
}

const handleLogin = async (req, res) => {
	if (!req.session.user) {
		var user = conn.query(`select * from users where name='${req.body.username}' and password='${req.body.password}'`, (err, result) => {
			// console.log(result)
			if (result.length > 0) {
				req.session.user = req.body.username;
				res.redirect('/home');
			} else res.redirect('/');
		});
	} else res.redirect('/home');
}

const handleLogout = (req, res) => {
	req.session.destroy(err => {
        if (!err) res.redirect('/');
    });
}

const getAllBooks = (req, res) => {
	conn.query(`select * from books`, (err, result) => {
		if (!err) res.json(result);
		else res.json({"success": false, "error_msg": err.message});
	});
}

const getTodaysReport=(req,res)=>{
	conn.query(`SELECT * FROM invoice WHERE DATE(time) = CURDATE() ORDER BY time;`,(err,result)=>{
		if(!err) res.json(result);
		else res.json({"success": false, "error_msg": err.message});
	})
	
}



const getAllStudents=(req, res) => {
	conn.query(`select * from student`, (err, result) => {
		if (!err) res.json(result);
		else res.json({"success": false, "error_msg": err.message});
	});
}

const getAllInvoices=(req, res) => {
	conn.query(`select * from invoice`, (err, result) => {
		if (!err) res.json(result);
		else res.json({"success": false, "error_msg": err.message});
	});
}

const reductBooks=(req,res)=>{
	console.log(req.query.class)
	conn.query(`UPDATE books SET stock = stock - 1 WHERE class=${req.query.class}`,(err,result)=>{
		if(!err) res.json(result)
		else console.log(err.message);
	})
}

 
const getSpecificBook = (req, res) => {
	conn.query(`select * from books where book_id='${req.query.id}'`, (err, result) => {
		if (!err){
			//console.log(result);
			res.json(result);
		}
		else {
			res.json({ "success": false, "error_msg": err.message });
		}
	});
}

const getSpecificStudent = (req, res) => {
	console.log(req.query.rid)
	conn.query(`select * from student where rid=${req.query.rid}`, (err, result) => {
		if (!err){
			//console.log(result);
			res.json(result);
		}
		else {
			res.json({ "success": false, "error_msg": err.message });
		}
	});
}

const getSpecificBill=(req,res)=>{
	console.log(req.query.rid)
	conn.query(`select * from invoice where uuid=${req.query.id}`, (err, result) => {
		if (!err){
			//console.log(result);
			res.json(result);
		}
		else {
			res.json({ "success": false, "error_msg": err.message });
		}
	});

}

const getStudentDetails=(req,res)=>{
	console.log(req.query.rid)
	conn.query(`select * from student where rid=${req.query.rid}`, (err, result) => {
		if (!err){
			//console.log(result);
			res.json(result);
		}
		else {
			res.json({ "success": false, "error_msg": err.message });
		}
	});
}

const getBookByClass=(req,res)=>{
	console.log(req.query.cl)
	conn.query(`select * from books where class=${req.query.cl}`, (err, result) => {
		if (!err){
			//console.log(result);
			res.json(result);
		}
		else {
			res.json({ "success": false, "error_msg": err.message });
		}
	});
}

const updateSpecificBook = (req, res) => {
	conn.query(`
		UPDATE books SET book_name='${req.body.book_name}',book_publisher='${req.body.book_publisher}',class='${req.body.class}',price=${req.body.price},stock=${req.body.stock} WHERE book_id=${req.body.book_id}
	`, (err, result) => {
		if (!err) res.json({ "success": true });
		else res.json({ "success": false, "err_msg": err.message });
	})
}

const updateSpecificStudent = (req, res) => {
	conn.query(`
	UPDATE student SET name='${req.body.name}',class='${req.body.class}',section='${req.body.section}',secondlang='${req.body.secondlang}',roll='${req.body.roll}',birth_date='${req.body.birth_date}',phone_number='${req.body.phone_number}' WHERE rid=${req.body.rid}
	`, (err, result) => {
		if (!err) res.json({ "success": true });
		else res.json({ "success": false, "err_msg": err.message });
	})
}
//UPDATE student SET name='${req.body.name}',class='${req.body.class}',section='${req.body.section}',secondlang='${req.body.secondlang}',roll=${req.body.roll},birth_date='${req.body.birth_date}',phone_number='${req.body.phone_number}' WHERE rid=${req.body.rid}

const createBook = (req, res) => {
	conn.query(`INSERT INTO books(book_name, book_publisher, class, price, stock) VALUES ('${req.body.book_name}','${req.body.book_publisher}}','${req.body.class}','${req.body.price}','${req.body.stock}')`, (err, result) => {
		if (!err) {
			// console.log(result);
			res.json({ "success": true });
		}
		else res.json({ "success": false, "err_msg": err.message });
	});
}
const createStudent = (req, res) => {
	conn.query(`INSERT INTO student(rid,name,class,section,secondlang,roll,birth_date,phone_number) VALUES (${req.body.rid},'${req.body.name}','${req.body.class}','${req.body.section}','${req.body.secondlang}','${req.body.roll}','${req.body.birth_date}','${req.body.phone_number}')`, (err, result) => {
		if (!err) {
			//console.log(result);
			res.json({ "success": true });
		}
		else res.json({ "success": false, "err_msg": err.message });
	});
	
}
const createInvoice = (req, res) => {
	let tid=req.body.id;
	let json_data = JSON.stringify(req.body.json_data);


	let sql = `
		insert into invoice values('${tid}', current_timestamp, '${json_data}');
	`;
	conn.query(sql, (err, result) => {
		if (!err) {
			console.log('success');
			res.json({ "success": true });
		}
		else {
			console.log(err.message);
			res.json({ "success": false, err_msg: err.message });
		}
	});
}

const test = (req, res) => {
	conn.query(`select data from invoice`, (err, result) => {
		if (!err) res.json(result);
		else res.json({ "err_msg": err.message });
	});
}


module.exports = {
	protectionLayer,
	handleLogin,
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
}