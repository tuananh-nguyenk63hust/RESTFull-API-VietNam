const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
fetchData = async(a,b) =>{
    var e=new XMLHttpRequest;
    e.onreadystatechange = function(){
        4===e.readyState && b(e.responseText);
        
    }
    
    e.open('GET',a);
    e.send();
}
get=async(url)=>{
    var txt;
    await fetchData(url,txt=function(b){{
       // txt=b;
        console.log(b);
        return res.json({message: 'Delete success!'});
    }})
    console.log(txt.toString());
    //return txt;
}