var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var hashInt = require("hash-int");
var dateTime = require('node-datetime');
let http = require('http').Server(app);
var mysql = require('mysql');
var fs=require('fs');

var cors=require('cors');

map= new Map();
app.use(bodyParser.json());
//mysql server
var con = mysql.createConnection({
    host: "localhost",
    user: "team9",
    password: "team9pass$",
    database: "team9db"
});


app.use(cors());

// Set up the server
//create empty array


var server = app.listen(37225,'193.227.9.124');


var urlencodedParser = bodyParser.urlencoded({ extended: false });
var rooms=new Map();
con.connect(function(err) {
    console.log("Connected to the database");
    var sql="select rooms.name,rooms.creator_id,users.username,rooms.creation_time,rooms.id from rooms inner join users where rooms.creator_id=users.id and rooms.state='1'";
    con.query(sql,function(err,result){
        if(err) throw err;
        for(var i=0;i<result.length;i++)
        {
            var key=hashInt(result[i].id);
            rooms.set(key,{room_id:result[i].id,room_name:result[i].name,creation_date:result[i].creation_time,creator_id:result[i].creator_id,creator_name:result[i].username,data:[]});

        }
    });
});






app.use('/images',express.static(__dirname + '/notebook'));
app.use('/users',express.static(__dirname + '/users')); //////////////edited
app.get('/notebook',function(req,res){
		 console.log("user  "+req.query.key);
	let userid=map.get(req.query.key).user_id;
		
	
	let sql="SELECT `note_book` FROM `users` WHERE `id`= '"+userid+"';";
	 con.query(sql,function(err,result){
	 if(err) {
		 console.log(sql);
		  res.json({"data":"0"});
		 }
		 else 			 
			 res.json({"data":result});
		
	 });
	
});
app.get('/boards',function(req,res){
		 console.log("user  "+req.query.key);
	let userid=map.get(req.query.key).user_id;
	let sql="SELECT rooms.name,boards.id FROM boards inner join rooms WHERE rooms.id=boards.room_id and boards.user_id= '"+userid+"' order by boards.id asc";
	 con.query(sql,function(err,result){
	 if(err) {
		 console.log(sql);
		  res.json({"data":"0"});
		 }
		 else 			 
			 res.json({"data":result});
		
	 });
	
});



app.get('/login', function(req, res) {
 let user=req.query.user;
 let pass=req.query.pass;
 let sql="SELECT `id`, `username`, `type`,`note_book` FROM `users` WHERE `username`='"+user+"' AND  `password`='"+pass+"';";

 let check=false;
 let data;
  con.query(sql,function(err,result){
					
                  if(err) console.log(sql);
				  
                else if(result.length >0) {
					check=true;
				
                    let value={'user_name':result[0].username,
                  'user_id':result[0].id,
                    'type':result[0].type,
                    'notebook':result[0].note_book};
                   // console.log(result[0].id);
					var key=hashInt(result[0].id);
					map.set(key.toString(),value);
					res.json({"check": check,"data":result,"key":key});
					console.log(key);
				
				}
				else res.json({"check": check});
});
 
 //res.json({"check": check,"data":data});

});



app.post('/register',urlencodedParser, function(req, res) {
 let user=req.body.user;
 let pass=req.body.pass;
 let type=req.body.type;
 let sql;
  let check=false;
 let data;
 console.log(req.files);
 sql=	"SELECT `id`, `username`, `type`,`note_book` FROM `users` WHERE `username`='"+user+"';";
  con.query(sql,function(err,result){
	    if(err) console.log(sql);
	  else if (result.length >0){
		  return res.json({"check": false,"data":"user name is already taken"});
		  
		  
	  }
	  else{
		  sql=" INSERT INTO `users`(`username`, `password`, `type`,note_book) VALUES ('"+user+"','"+pass+"','"+type+"','0');";

  con.query(sql,function(err,result){
					
                 if(err) console.log(sql);
				  
                else  {
				sql=	"SELECT `id`, `username`, `type`,`note_book` FROM `users` WHERE `username`='"+user+"' AND  `password`='"+pass+"';";
				 con.query(sql,function(err,result){
					   if(err) console.log(sql);
					   else if (result.length >0){
						   check=true;
				let value={'user_name':result[0].username,
                  'user_id':result[0].id,
                    'type':result[0].type,
                    'notebook':result[0].note_book};
					let key=hashInt(result[0].id)
					map.set(key.toString(),value);
					
				/*
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.image;
 
  // Use the mv() method to place the file somewhere on your server
  console.log("id of user"+result[0].id);
  sampleFile.mv(__dirname+'/users/'+result[0].id+'.jpg', function(err) {
	  
    if (err)
      return res.status(500).send(err);
 
   
  });*/
					
					res.json({"check": check,"data":result,"key":key});
				 }
				
				else res.json({"check": check});
					 
					 
				 });
  

				}

  });
		  
		  
	  }
  });
 
});


app.get('/rooms',function (req,res) {
    var rooms_Data=[],i=0;
    var keys=rooms.keys();
    while(rooms.size>i) 
    {
        var room_key=keys.next().value;
        rooms_Data.push({room_key:room_key,
                          room_name:rooms.get(room_key).room_name,
                           date:rooms.get(room_key).creation_date,
                            creator_name:rooms.get(room_key).creator_name});
        ++i;
    }
    //console.log(rooms);
    //console.log(rooms_Data);
	res.json({'rooms':rooms_Data});//error ??????????

});

app.get('/personal_rooms', function(req,res){
	let userid= map.get(req.query.key).user_id;
	let sql="SELECT  `name` FROM `rooms` INNER JOIN `room_user` ON  `user_id`='"+userid+"' AND  `id`= `room_id`;";
	con.query(sql,function(err,result){
					
                  if(err) {
					  console.log(sql);
				  	res.json({"data":""});
					}
				  
            
                else 	res.json({"data":result});
	});
});


app.get('/user_data',function(req,res){
	let userid=map.get(req.query.key).user_id;
	let sql="SELECT `username` FROM `users` WHERE `id` ='"+userid+"';";
	con.query(sql,function(err,result){
					
                  if(err) {
					  console.log(sql);
				  res.json({"username":""});
					}
				  
                else 	res.json({"username":result});
	});
});

app.get('/edit_user_data',function(req,res){
	let userid=map.get(req.query.key).user_id;
	let username=map.get(req.query.key).username;
	let userpass=map.get(req.query.key).pass;
	let sql="UPDATE `users` SET `username`='"+username+"',`password`='"+userpass+"' WHERE `id`='"+userid+"';";
	con.query(sql,function(err,result){
					
                  if(err) {
					  console.log(sql);
				  res.json({"check":false});
					}
				  
                else 	{
					sql="SELECT `username` FROM `users` WHERE `id` ='"+userid+"';";
					 if(err) {
					  console.log(sql);
				  res.json({'check':true,'username':""});
					}
					else  {
						map.set(req.query.key).username=result[0].username;
					res.json({'check':true,'username':result});}
					
				}
	});
	
	
});


app.post('/room',urlencodedParser,function (req,res) {
    var sql="insert into rooms(creator_id,name,creation_time) values(?,?,?)";
	console.log(req.body);
	let key=req.body.key;

	var date=(dateTime.create().format('Y-m-d H:M:S'));
	console.log("Room name "+req.body.room_name);
	let user_id=map.get(key).user_id;
    con.query(sql,[user_id,req.body.room_name,date],function (err,result) {
        if(err) console.log(err.message);
        else
            {
            var room_id = result.insertId;
            var new_room = hashInt(room_id);
			console.log("Room is inserted");
           

                rooms.set(new_room,
                    {creation_date:date,
                        room_id:room_id,
                        creator_id: user_id,
                        creator_name:map.get(key).user_name,
                        room_name: req.body.room_name,
                        data:[]});
           
        }
        res.redirect('/room?room='+new_room+'&key='+key);
    });
});

app.get('/room',function (req,res) {
console.log(req.query.room);

    var room_id=rooms.get(parseInt(req.query.room)).room_id;
    var key = parseInt(req.query.key);
    try {

        var user_id = map.get(key.toString()).user_id;
    }
    catch(err)
    {

        console.log(map);
        console.log(req.query);
    }
    var sql="insert ignore into room_user(user_id,room_id) values(?,?)";
    con.query(sql,[user_id,room_id],function (err,result) {
       if(err) {console.log(err.message);
       res.json({'check':false});}
       else res.json({'check':true,'room_id':parseInt(req.query.room)});
    });
});




var io = require('socket.io')(server);

io.sockets.on('connection',

  function (socket) {

    socket.on("connectt",function (data) {


        //var user = data.key;
        var id = parseInt(data.room);
        var user_hashId=data.user;

        socket.user_id=map.get(user_hashId).user_id;
        socket.user_name=map.get(user_hashId).user_name;
        socket.type=map.get(user_hashId).type;
		socket.notebook=map.get(user_hashId).notebook;
		var temp=false;
		console.log("creator id "+rooms.get(id).creator_id)
		if(socket.user_id==rooms.get(id).creator_id)
		temp=true;
        console.log("check is "+temp);

        if(rooms.has(id))
            socket.join(id.toString(),function () {
                socket.emit('enter',{type:socket.type,check:temp,image:rooms.get(id).data});
            });
        else socket.disconnect();
    });


    socket.on('mouse', function(ev) {

            var room_name=Object.keys(io.sockets.adapter.sids[socket.id])[0].toString();
            if(socket.type==1) {
                rooms.get(parseInt(room_name)).data.push(ev);
                socket.broadcast.to(ev.room).emit('mouse', ev);
            }
        }
    );

socket.on('new message',function(data){
    data.username=socket.user_name;
    var room_name=Object.keys(io.sockets.adapter.sids[socket.id])[0].toString();
    io.sockets.in(room_name).emit('chat message',data);
  console.log("Server Recieve message");
});

socket.on('typing',function(){
    var data={username:socket.user_name};
    var room_name=Object.keys(io.sockets.adapter.sids[socket.id])[0].toString();

   socket.broadcast.to(room_name).emit('User typing',data);

});



	
	

	

	socket.on('SaveNotebook',
      function(SavedData) {
	  var pages;
	  console.log(socket.notebook);
			  pages=++socket.notebook;
			  var sql2="UPDATE `users` SET note_book=note_book+1 WHERE `id`='"+socket.user_id+"';";
		
					con.query(sql2,function (err,result2) {
					if(err) console.log("error");
					else
						{
						
						fs.writeFile(__dirname+"/notebook/"+socket.user_id+'p'+pages+'.jpg',SavedData.image,'base64',function (err) {
                    if(err)
						console.log(err);
                    });
						}
        });

      }
    );

	socket.on('save',function(data){
	var room_name=Object.keys(io.sockets.adapter.sids[socket.id])[0].toString();
	var room_id=(rooms.get(parseInt(room_name)).room_id);
        var sql="insert into boards(room_id,user_id) values (?,?)";
        con.query(sql,[room_id,socket.user_id],function (err,result) {
		   if(err) console.log(sql);
            else
                fs.writeFile(__dirname+"/notebook/"+result.insertId+'.jpg',data.image,'base64',function (err) {
                    if(err)
                    {
                        var sql="delete from board where id='"+result.insertId+"';";
                        con.query(sql,function(err,result){
                            io.sockets.emit('message',"couldn't save the image");
                        });
                        console.log(err);
                    }
                    else
                        io.sockets.emit('message',"saved");

                });
        });
    });



  socket.on('close',function () {
      var room_name=Object.keys(io.sockets.adapter.sids[socket.id])[0];
      var users=io.sockets.clients();
    //  console.log("users ",users);
      if(socket.user_id==rooms.get(parseInt(room_name)).creator_id)
      {
          con.query("update rooms set state=0 where id=?",[rooms.get(parseInt(room_name)).room_id],function (err,result) {
              if(!err)
              {
			  rooms.delete(parseInt(room_name));
                  io.sockets.in(room_name).emit('close',{message:"the room has been closed"});
                  
              }
              else console.log("ma4ta8el");
          });
      }

    });

  socket.on('leave',function()
  {
      socket.disconnect();
  });

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
      //????????
    });
  }
);



