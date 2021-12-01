var cmd=require('node-cmd'); 
const processRef = cmd.run('npm start');
let data_line = '';
 
//listen to the python terminal output
processRef.stdout.on(
  'data',
  function(data) {
    // data_line += data;
    // if (data_line[data_line.length-1] == '\n') {
    //   console.log('===========================',new Date().toISOString(),'===========================', data_line);
    // }
    console.log(new Date().toISOString(),': ', data+"\n");
  }
);