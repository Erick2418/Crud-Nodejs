const controller = {};

controller.list= (req,res)=>{
    // res.send('hellow world');
    req.getConnection(// se encarga de pedi una coneccion a mysql
        (err, conn)=>{ //pero al pedir la conexion puede pasar un error o puede conectarse, por ello el callback
            conn.query('SELECT * FROM customer', //hacemos la consulta
                (err,customers)=>{ // puede que de error o traigamos las filas
                    if(err){
                        res.json(err);
                    }
                    res.render('customers',{
                        data: customers
                    });
                }
            );
    }) 
}

controller.save=(req,res)=>{
    const data= req.body;
    req.getConnection(// se encarga de pedi una coneccion a mysql
       (err, conn)=>{ //pero al pedir la conexion puede pasar un error o puede conectarse, por ello el callback
            conn.query('INSERT INTO customer set ?',[data],(err,customers)=>{ 
                    res.redirect('/');
                }
            );
    })
};

controller.delete=(req,res)=>{
    const {id} = req.params;
    req.getConnection(// se encarga de pedi una coneccion a mysql
        (err, conn)=>{ //pero al pedir la conexion puede pasar un error o puede conectarse, por ello el callback
             conn.query('DELETE FROM customer WHERE id=? ',[id],(err,customers)=>{ 
                     res.redirect('/');
                 }
             );
     })
};



controller.edit=(req,res)=>{
    const {id} = req.params;
    req.getConnection(
        (err, conn)=>{ 
             conn.query('SELECT * FROM customer WHERE id=? ',[id],(err,customers)=>{ 
                    
                     res.render('customers_edit',{
                         data:customers[0]// para obtener en forma objeto debido a que estamos recibiendo en modo arreglo de objetos.
                     })

                 }
             );
     })
};



controller.update=(req,res)=>{
    const {id} = req.params;
    console.log("EL ID  ES "+id);
    const newCustomer = req.body;
    req.getConnection(
        
        (err, conn)=>{ 
             
             conn.query('UPDATE customer set ? WHERE id= ?',[newCustomer,id],(err,rows)=>{ 
                    res.redirect('/');
                 }
             );
     })
};


module.exports =  controller;